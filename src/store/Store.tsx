import React, { useContext, useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { ActionType } from '../enums/ActionTypes';

interface State {
  todos: Todo[];
}

type Action =
  | { type: ActionType.ADD_TODO; payload: string }
  | { type: ActionType.DELETE_TODO; payload: number }
  | { type: ActionType.TOGGLE_TODO; payload: number }
  | { type: ActionType.EDIT_TODO; payload: { id: number; title: string } }
  | { type: ActionType.CLEAR_COMPLETED }
  | { type: ActionType.TOGGLE_ALL };

const initialState: State = {
  todos: [],
};

const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: +new Date(), title: action.payload, completed: false },
        ],
      };
    case ActionType.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case ActionType.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case ActionType.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title.trim() }
            : todo,
        ),
      };
    case ActionType.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    case ActionType.TOGGLE_ALL:
      const allCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, completed: !allCompleted })),
      };
    default:
      return state;
  }
};

const StateContext = React.createContext(initialState);
const DispatchContext = React.createContext<React.Dispatch<Action> | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState, () => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? { todos: JSON.parse(savedTodos) } : initialState;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}> {children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }

  return context;
};

export const useGlobalDispatch = () => {
  const context = useContext(DispatchContext);

  if (!context) {
    throw new Error(
      'useGlobalDispatch must be used within a GlobalStateProvider',
    );
  }

  return context;
};
