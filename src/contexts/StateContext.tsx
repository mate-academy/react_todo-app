import React, { useEffect, useReducer } from 'react';
import { State } from '../types/State';
import { Action, ActionTypes } from '../types/Actions';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

const initialState: State = {
  todos: [],
  filter: Status.All,
};

const data = localStorage.getItem('todos');

if (data !== null) {
  initialState.todos = JSON.parse(data) as Todo[];
}

function reducer(state: State, action: Action): State {
  let todos = [...state.todos];

  switch (action.type) {
    case ActionTypes.AddTodo: {
      todos = [...state.todos, action.payload];

      return { ...state, todos };
    }

    case ActionTypes.UpdateTodo: {
      const index: number = todos.findIndex(
        todo => todo.id === action.payload.id,
      );

      todos[index].title = action.payload.title;

      return { ...state, todos };
    }

    case ActionTypes.ToggleStatus: {
      const index: number = todos.findIndex(
        todo => todo.id === action.payload,
      );

      todos[index].completed = !todos[index].completed;

      return { ...state, todos };
    }

    case ActionTypes.ToggleStatusAll: {
      const value = todos.every(
        (todo) => todo.completed,
      );

      todos = todos.map((todo) => {
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

    case ActionTypes.DeleteTodo: {
      const index: number = todos.findIndex(
        todo => todo.id === action.payload,
      );

      const new1stTodos = state.todos.slice(0, index);
      const new2ndTodos = state.todos.slice(index + 1);

      todos = new1stTodos.concat(new2ndTodos);

      return ({ ...state, todos });
    }

    case ActionTypes.DeleteCompletedTodo:
      todos = todos.filter((todo) => !todo.completed);

      return ({ ...state, todos });

    case ActionTypes.SetTodosFilter: {
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

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode,
};

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
