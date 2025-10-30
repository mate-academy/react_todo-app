// import { Children } from "react";
import React, { useEffect } from 'react';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { getStoredTodos, saveTodosLocalStorage } from './api/localTodos';

interface GlobalState {
  todos: Todo[];
  filter: Filter;
}

const initialState: GlobalState = {
  todos: [],
  filter: Filter.All,
};

type RootState = typeof initialState;

type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: { id: number } }
  | { type: 'editTitle'; payload: { id: number; title: string } }
  | { type: 'editStatus'; payload: { id: number; completed: boolean } }
  | { type: 'setFilter'; payload: Filter }
  | { type: 'clearCompleted' }
  | { type: 'toggleAll' }
  | { type: 'setTodos'; payload: Todo[] };

const reducer = (state: RootState, action: Action): GlobalState => {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };

    case 'editTitle':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };

    case 'editStatus':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: action.payload.completed }
            : todo,
        ),
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };

    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'toggleAll':
      const allCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !allCompleted,
        })),
      };

    case 'setTodos':
      return { ...state, todos: action.payload };

    default:
      return state;
  }
};

const StateContext = React.createContext<RootState>(initialState);
const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

export const useGlobalState = () => React.useContext(StateContext);
export const useDispatch = () => React.useContext(DispatchContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    const stored = getStoredTodos();

    dispatch({ type: 'setTodos', payload: stored });
  }, []);

  useEffect(() => {
    saveTodosLocalStorage(state.todos);
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
