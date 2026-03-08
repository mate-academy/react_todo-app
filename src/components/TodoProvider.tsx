import { Todo } from '../types/Todo';
import { createContext } from 'react';
import React, { Dispatch, useReducer } from 'react';

interface State {
  todos: Todo[];
}

export type Action =
  | { type: 'ADD'; payload: string }
  | { type: 'DELETE'; payload: number }
  | { type: 'CHANGE'; payload: number }
  | { type: 'EDIT'; payload: { id: number; title: string } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'TOGGLE_ALL' };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: +new Date(), title: action.payload, completed: false },
        ],
      };

    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload),
      };

    case 'CHANGE':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t,
        ),
      };

    case 'EDIT':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id
            ? { ...t, title: action.payload.title }
            : t,
        ),
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(t => !t.completed),
      };

    case 'TOGGLE_ALL': {
      const hasActiveTodos = state.todos.some(todo => !todo.completed);

      return {
        ...state,
        todos: state.todos.map(t => ({
          ...t,
          completed: hasActiveTodos,
        })),
      };
    }

    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
};

const init = (): State => ({
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
});

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<Dispatch<Action>>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
