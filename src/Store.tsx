import React, { useReducer } from 'react';
import { ErrorMessage } from './types/ErrorMessage';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
export type Action =
  | { type: 'download' }
  | { type: 'downloadSuccess'; todos: Todo[] }
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
  tempTodo: Todo | null;
  selectedTodo: number[];
  status: Status;
  isProcessing: boolean;
  errorMessage: ErrorMessage | null;
}

const initialState: RootState = {
  todos: [],
  tempTodo: null,
  selectedTodo: [],
  status: Status.all,
  isProcessing: false,
  errorMessage: null,
};

const reducer = (state: RootState, action: Action): RootState => {
  switch (action.type) {
    case 'download':
      return {
        ...state,
        isProcessing: true,
        errorMessage: null,
      };
    case 'downloadSuccess':
      return {
        ...state,
        todos: action.todos,
        isProcessing: false,
      };
    case 'failure':
      return {
        ...state,
        errorMessage: action.errorMessage,
        isProcessing: false,
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
        tempTodo: action.tempTodo,
        isProcessing: true,
        errorMessage: null,
      };
    case 'addingSuccess':
      return {
        ...state,
        isProcessing: false,
        tempTodo: null,
        todos: [...state.todos, action.newTodo],
      };
    case 'reset':
      return {
        ...state,
        tempTodo: null,
        selectedTodo: [],
      };
    case 'startAction':
      return {
        ...state,
        isProcessing: true,
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
        isProcessing: false,
      };
    case 'editTodoSuccess': {
      const updatedTodos = state.todos.map((todo, idx) =>
        idx === action.index ? action.updatedTodo : todo,
      );

      return {
        ...state,
        todos: updatedTodos,
        isProcessing: false,
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
        isProcessing: false,
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
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
