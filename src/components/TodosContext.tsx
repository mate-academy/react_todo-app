import React, { useReducer } from 'react';

import { Todo } from '../types/Todo';

type Action =
  { type: 'createTodo', payload: Todo }
  | { type: 'updateTodo', payload: Todo }
  | { type: 'toggleAll', payload: boolean };

type State = {
  toggleAll: boolean,
  todos: Todo[]
};

const initialState = {
  toggleAll: false,
  todos: [] as Todo[],
};

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

      return { ...state };
    }

    default:
      return state;
  }
};

export const StateContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext<(action: Action) => void>(() => {});

type Props = {
  children: React.ReactNode
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
