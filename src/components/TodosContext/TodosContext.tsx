/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer } from 'react';
import {
  Action,
  ActionTypes,
  State,
  Status,
  Todo,
} from '../../types/types';

const initialState: State = {
  todos: [],
  filter: Status.All,
};

const data = localStorage.getItem('todos');

if (data !== null) {
  initialState.todos = JSON.parse(data);
}

function reducer(state: State, action: Action): State {
  let todos: Todo[] = [...state.todos];

  switch (action.type) {
    case ActionTypes.AddTodo: {
      todos = [...todos, action.payload];

      return ({ ...state, todos });
    }

    case ActionTypes.RemoveTodo: {
      const new1Todos = state.todos.slice(0, action.payload);
      const new2Todos = state.todos.slice(action.payload + 1);

      todos = new1Todos.concat(new2Todos);

      return ({ ...state, todos });
    }

    case ActionTypes.CompleteTodo: {
      todos[action.payload].completed = !todos[action.payload].completed;

      return ({ ...state, todos });
    }

    case ActionTypes.CompleteAllTodo: {
      const value = todos.every(
        (todo: Todo) => todo.completed === true,
      );

      todos = todos.map((todo: Todo) => {
        const newTodo = { ...todo };

        switch (value) {
          case true:
            newTodo.completed = false;
            break;

          default:
            newTodo.completed = true;
        }

        return newTodo;
      });

      return ({ ...state, todos });
    }

    case ActionTypes.RemoveCompletedTodo: {
      todos = todos.filter((todo: Todo) => todo.completed === false);

      return ({ ...state, todos });
    }

    case ActionTypes.EditTodo: {
      todos = todos.map(todo => (
        (todo.id === action.payload.id)
          ? {
            ...todo,
            title: action.payload.title,
          }
          : todo
      ));

      return ({ ...state, todos });
    }

    case ActionTypes.FilterTodo: {
      if (action.payload === state.filter) {
        return state;
      }

      return {
        ...state,
        filter: action.payload,
      };
    }

    default:
      return state;
  }
}

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext((_action: Action) => { });

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { todos } = state;

  useEffect(() => {
    if (todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
