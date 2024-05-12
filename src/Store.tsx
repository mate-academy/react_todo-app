import React, { PropsWithChildren, useEffect, useReducer } from 'react';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'remove'; payload: number }
  | { type: 'set-complete'; payload: { id: number; completed: boolean } }
  | { type: 'set-title'; payload: { id: number; title: string } }
  | { type: 'set-filter'; payload: Filter };

interface State {
  todos: Todo[];
  filter: Filter;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set-filter':
      return {
        ...state,
        filter: action.payload,
      };
    case 'add':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'remove':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'set-complete':
      const toggledTodo = state.todos.find(
        todo => todo.id === action.payload.id,
      );

      if (toggledTodo) {
        toggledTodo.completed = action.payload.completed;
      }

      return {
        ...state,
        todos: [...state.todos],
      };
    case 'set-title':
      const titledTodo = state.todos.find(
        todo => todo.id === action.payload.id,
      );

      if (titledTodo) {
        titledTodo.title = action.payload.title;
      }

      return {
        ...state,
        todos: [...state.todos],
      };
    default:
      return state;
  }
};

const getPresentTodos = (): Todo[] => {
  const data = localStorage.getItem('todos');

  if (data === null) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

const initialState: State = {
  todos: getPresentTodos(),
  filter: Filter.ALL,
};

export const StateContex = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContex = React.createContext((_action: Action) => {});

export const GlobalStateProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.removeItem('todos');
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContex.Provider value={dispatch}>
      <StateContex.Provider value={state}>{children}</StateContex.Provider>
    </DispatchContex.Provider>
  );
};
