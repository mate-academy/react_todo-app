import { createContext, useReducer } from 'react';
import React from 'react';
import { Todo } from './types/TodoList';

const LOCAL_STORAGE_KEY = 'todos';

export type Action =
  | { type: 'setTodos'; payload: Todo[] }
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: { id: number } }
  | { type: 'completed'; payload: { id: number } }
  | { type: 'allCompleted' }
  | { type: 'deleteAllCompleted' }
  | { type: 'filterTodos'; name: 'All' | 'Active' | 'Completed' }
  | { type: 'editTodo'; payload: { id: number; title: string } };

export type State = {
  todos: Todo[];
  filterTodos: 'All' | 'Active' | 'Completed';
};

const emptyInitialState: State = {
  todos: [],
  filterTodos: 'All',
};

if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(emptyInitialState));
}

const initialState: State = JSON.parse(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  localStorage.getItem(LOCAL_STORAGE_KEY)!,
);

type InitialDispatch = (action: Action) => void;

const reducer = (state: State, action: Action): State => {
  let newState: State = state;

  switch (action.type) {
    case 'setTodos':
      newState = {
        ...state,
        todos: action.payload,
      };
      break;
    case 'addTodo':
      newState = {
        ...state,
        todos: [...state.todos, action.payload],
      };
      break;
    case 'deleteTodo':
      newState = {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
      break;
    case 'completed':
      newState = {
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
      break;
    case 'allCompleted':
      newState = {
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
      break;
    case 'deleteAllCompleted':
      newState = {
        ...state,
        todos: state.todos.filter(todo => todo.completed === false),
      };
      break;
    case 'filterTodos':
      newState = {
        ...state,
        filterTodos: action.name,
      };
      break;
    case 'editTodo':
      newState = {
        ...state,
        todos: state.todos.map(item => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              title: action.payload.title,
            };
          } else {
            return item;
          }
        }),
      };
      break;
    default:
      newState = state;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));

  return newState;
};

export const StateContext = createContext(initialState);
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
