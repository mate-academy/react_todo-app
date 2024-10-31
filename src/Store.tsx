import React, { useEffect, useReducer } from 'react';
import { ErrorMessage } from './types/ErrorMessage';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
export type Action =
  | { type: 'failure'; errorMessage: ErrorMessage | null }
  | { type: 'closeNotification' }
  | { type: 'filterStatus'; status: Status }
  | { type: 'addTodo'; tempTodo: Todo }
  | { type: 'addingSuccess'; newTodo: Todo }
  | { type: 'reset' }
  | { type: 'startAction'; selectedTodo: number[] }
  | { type: 'deletingSuccesses' }
  | { type: 'editTodoSuccess'; index: number; updatedTodo: Todo }
  | { type: 'toggleAllSuccesses'; completed: boolean };

interface RootState {
  todos: Todo[];
  selectedTodo: number[];
  status: Status;
  errorMessage: ErrorMessage | null;
}

const initialState: RootState = {
  todos: [],
  selectedTodo: [],
  status: Status.all,
  errorMessage: null,
};

const reducer = (state: RootState, action: Action): RootState => {
  switch (action.type) {
    case 'failure':
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case 'closeNotification':
      return {
        ...state,
        errorMessage: null,
      };
    case 'filterStatus':
      return {
        ...state,
        status: action.status,
      };
    case 'addTodo':
      return {
        ...state,
        errorMessage: null,
      };
    case 'addingSuccess':
      return {
        ...state,
        todos: [...state.todos, action.newTodo],
      };
    case 'reset':
      return {
        ...state,
        selectedTodo: [],
      };
    case 'startAction':
      return {
        ...state,
        errorMessage: null,
        selectedTodo: action.selectedTodo,
      };
    case 'deletingSuccesses':
      const newTodos = state.todos.filter(
        todo => !state.selectedTodo.includes(todo.id),
      );

      return {
        ...state,
        todos: newTodos,
      };
    case 'editTodoSuccess': {
      const updatedTodos = state.todos.map((todo, idx) =>
        idx === action.index ? action.updatedTodo : todo,
      );

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case 'toggleAllSuccesses': {
      const updatedTodos = state.todos.map(todo => ({
        ...todo,
        completed: action.completed,
      }));

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    default:
      return state;
  }
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars, prettier/prettier
export const DispatchContext = React.createContext((action: Action) => { });

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? { ...initial, todos: JSON.parse(savedTodos) } : initial;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
