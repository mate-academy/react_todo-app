import { createContext, useReducer } from 'react';
import React from 'react';
import { Todo } from './types/TodoList';

export type Action =
  | { type: 'setTodos'; payload: Todo[] }
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: { id: number } }
  | { type: 'completed'; payload: { id: number } }
  | { type: 'allCompleted' }
  | { type: 'deleteAllCompleted' }
  | { type: 'filterTodos'; name: 'All' | 'Active' | 'Completed' };

export type State = {
  todos: Todo[];
  filterTodos: 'All' | 'Active' | 'Completed';
};

const initialState: State = {
  todos: [],
  filterTodos: 'All',
};

type InitialDispatch = (action: Action) => void;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setTodos':
      return {
        ...state,
        todos: action.payload,
      };
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
    case 'completed':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };
    case 'allCompleted':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.completed === false) {
            return {
              ...todo,
              completed: true,
            };
          }

          if (state.todos.every(todo1 => todo1.completed === true)) {
            return {
              ...todo,
              completed: false,
            };
          }

          return todo;
        }),
      };
    case 'deleteAllCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.completed === false),
      };
    case 'filterTodos':
      return {
        ...state,
        filterTodos: action.name,
      };

    default:
      return state;
  }
};

// телефон директора для отримання інформації
export const StateContext = createContext(initialState);
// телефон директора для керування інафомацією
export const DispatchContext = createContext<InitialDispatch>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
