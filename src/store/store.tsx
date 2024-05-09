import React, { FC, ReactNode, useReducer } from 'react';

import { Action } from '../Types/Action';
import { Status } from '../Types/Status';
import { Todo } from '../Types/Todo';

interface Props {
  children: ReactNode;
}

interface State {
  todos: Todo[];
  status: Status;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'add-todo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'toggle-completed':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            // console.log('click');

            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };

    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'clear-completed':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.completed === false),
      };

    case 'toggle-all':
      const allCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, completed: !allCompleted })),
      };

    case Status.All: {
      return {
        ...state,
        status: Status.All,
      };
    }

    case Status.Active: {
      return {
        ...state,
        status: Status.Active,
      };
    }

    case Status.Completed: {
      return {
        ...state,
        status: Status.Completed,
      };
    }

    default:
      return state;
  }
};

const initialState: State = {
  todos: [],
  status: Status.All,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<(action: Action) => void>(
  () => {},
);

const GlobalStateProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default GlobalStateProvider;
