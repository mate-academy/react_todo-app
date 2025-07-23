import { Todo } from './types/Todo';
import React, { useEffect, useReducer } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from './utils/localStorage';

type RootState = {
  todos: Todo[];
};

const initialState: RootState = {
  todos: getFromLocalStorage('todos', []),
};

type Action =
  | { type: 'addTodo'; newTodo: Todo }
  | { type: 'updateTodo'; updatedTodo: Todo }
  | { type: 'deleteTodo'; todoId: number }
  | { type: 'clearCompleted' }
  | { type: 'toggleTodos'; updatedTodos: Todo[] };

const reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.newTodo],
      };

    case 'updateTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.updatedTodo.id ? action.updatedTodo : todo,
        ),
      };

    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.todoId),
      };

    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'toggleTodos':
      return {
        ...state,
        todos: state.todos.map(
          todo =>
            action.updatedTodos.find(updated => updated.id === todo.id) || todo,
        ),
      };

    default:
      return state;
  }
};

export const StateContext = React.createContext<RootState>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    saveToLocalStorage('todos', state.todos);
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
