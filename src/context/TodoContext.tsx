import React, { FC, useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

type State = typeof initialState;

/* eslint-disable @typescript-eslint/indent */
type Action =
  | {
      type: 'addTodo';
      payload: Todo;
    }
  | {
      type: 'removeTodo';
      payload: Todo['id'];
    }
  | {
      type: 'toggleTodoStatus';
      payload: Todo['id'];
    }
  | {
      type: 'toggleTodoStatuses';
    }
  | {
      type: 'updateTodoTitle';
      payload: Todo;
    }
  | { type: 'clearCompletedTodos' };

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'addTodo':
      return [...state, action.payload];

    case 'toggleTodoStatus':
      return state.map(todo => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

    case 'removeTodo':
      return state.filter(todo => todo.id !== action.payload);

    case 'updateTodoTitle':
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title,
          };
        }

        return todo;
      });

    case 'clearCompletedTodos':
      return state.filter(todo => !todo.completed);

    case 'toggleTodoStatuses':
      const isUncompletedTodos = state.filter(todo => !todo.completed);

      if (isUncompletedTodos.length !== 0) {
        return state.map(todo => {
          if (isUncompletedTodos.includes(todo)) {
            return {
              ...todo,
              completed: true,
            };
          }

          return todo;
        });
      }

      return state.map(todo => ({ ...todo, completed: false }));

    default:
      return state;
  }
}

const LS_TODOS_KEY = 'todos';

function init(state: State): State {
  try {
    const storedData = localStorage.getItem(LS_TODOS_KEY);

    return storedData ? JSON.parse(storedData) : state;
  } catch (e) {
    return state;
  }
}

interface Props {
  children: React.ReactNode;
}

export const TodoProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem(LS_TODOS_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
