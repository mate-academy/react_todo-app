/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useReducer } from 'react';
import { Status } from '../../types/status';
import { Todo } from '../../types/todo';

export type Action = { type: 'Add', payload: Todo }
  | { type: 'Delete', payload: number }
  | { type: 'Completed', payload: number }
  | { type: 'Editing', payload: number }
  | { type: 'ChangeStatus', payload: Status }
  | { type: 'CompletedAll' }
  | { type: 'CleardAll' };

function completedAll(state: Todo[]) {
  const allAreCompleted = state.every(todo => todo.completed);

  return state.map(todo => {
    return { ...todo, completed: !allAreCompleted };
  });
}

interface State {
  todos: Todo[],
  select: Status,
}

const initialState: State = {
  todos: [],
  select: Status.ALL,
};

function reduser(state: State, action: Action) {
  const { todos } = state;

  switch (action.type) {
    case 'Add':
      return {
        ...state,
        todos: [...todos, action.payload],
      };
    case 'Delete':
      return {
        ...state,
        todos: todos.filter((item: Todo) => item.id !== action.payload),
      };
    case 'Completed':
      return {
        ...state,
        todos: todos.map((item: Todo) => {
          if (item.id === action.payload) {
            return {
              ...item,
              completed: !item.completed,
            };
          }

          return item;
        }),
      };
    case 'CompletedAll': {
      return {
        ...state,
        todos: completedAll(todos),
      };
    }

    case 'CleardAll':
      return {
        ...state,
        todos: todos.filter((item: Todo) => !item.completed),
      };

    case 'ChangeStatus':
      return {
        ...state,
        select: action.payload,
      };

    // case 'Editing': {

    //   };
    // }

    default:
      return state;
  }
}

const initializer = (initialValue = initialState) => {
  const data = localStorage.getItem('todos');

  if (!data) {
    return initialValue;
  }

  return JSON.parse(data) as State;
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext(
  (action: Action) => {
    // eslint-disable-next-line no-console
    console.log(action);
  },
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reduser, initialState, initializer);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
