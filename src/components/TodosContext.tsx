import React, { useReducer } from 'react';

import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { State } from '../types/State';
import { initialState } from '../constants/initialState';

type Action =
  { type: 'createTodo', payload: Todo }
  | { type: 'updateTodo', payload: Todo }
  | { type: 'toggleAll', payload: boolean }
  | { type: 'filter', payload: Status }
  | { type: 'destroy', payload: number }
  | { type: 'clear' }
  | { type: 'edit', payload: Todo };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'createTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'toggleAll': {
      const { todos } = state;

      if (!todos.length) {
        return {
          ...state,
          toggleAll: action.payload,
        };
      }

      const toggledTodos = state.todos.map(todo => (
        {
          ...todo,
          completed: action.payload,
        }
      ));

      return {
        ...state,
        toggleAll: action.payload,
        todos: toggledTodos,
      };
    }

    case 'updateTodo': {
      const { completed, id, title } = action.payload;

      const updatedTodo = state.todos.find(
        todo => (todo.id === id),
      );

      if (updatedTodo) {
        updatedTodo.completed = completed;
        updatedTodo.title = title;
      }

      return {
        ...state,
        toggleAll: state.todos.every(t => t.completed),
      };
    }

    case 'filter': {
      return {
        ...state,
        filteredBy: action.payload,
      };
    }

    case 'destroy': {
      const filteredTodos = state.todos.filter(t => t.id !== action.payload);

      return {
        ...state,
        todos: filteredTodos,
      };
    }

    case 'clear': {
      const filteredTodos = state.todos.filter(t => !t.completed);

      return {
        ...state,
        todos: filteredTodos,
      };
    }

    case 'edit': {
      const { id, title } = action.payload;

      const updatedTodo = state.todos.find(
        todo => (todo.id === id),
      );

      if (updatedTodo) {
        updatedTodo.title = title;
      }

      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export const StateContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext<(action: Action) => void>(() => {});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export {};
