import React, { createContext, useEffect, useReducer } from 'react';
import { Action } from '../types/Action';
import { State } from '../types/State';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ActionTypes } from '../types/ActionTypes';
import { filterOptions } from '../constants/filterOptions';

const initialState: State = {
  todos: [],
  currentFilter: filterOptions[0],
};

function reducer(state: State, action: Action): State {
  let todos = [...state.todos];

  switch (action.type) {
    case ActionTypes.AddTodo: {
      todos = [...todos, action.payload];

      return ({
        ...state,
        todos,
      });
    }

    case ActionTypes.DeleteTodo:
      todos = todos.filter(({ id }) => id !== action.payload);

      return {
        ...state,
        todos,
      };

    case ActionTypes.ChangeFilter: {
      if (action.payload === state.currentFilter) {
        return state;
      }

      return {
        ...state,
        currentFilter: action.payload,
      };
    }

    case ActionTypes.ToggleCompleted: {
      todos = todos.map(todo => (
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      ));

      return ({
        ...state,
        todos,
      });
    }

    case ActionTypes.ToggleAllTodos: {
      todos = todos.map(todo => ({
        ...todo,
        completed: action.payload.isChecked,
      }));

      return ({
        ...state,
        todos,
      });
    }

    case ActionTypes.ClearCompleted: {
      todos = todos.filter(({ completed }) => !completed);

      return {
        ...state,
        todos,
      };
    }

    case ActionTypes.SaveChanges: {
      todos = todos.map(todo => (
        (todo.id === action.payload.id)
          ? {
            ...todo,
            title: action.payload.title,
          }
          : todo
      ));

      return {
        ...state,
        todos,
      };
    }

    default:
      return state;
  }
}

export const StateContext = createContext(initialState);

type Dispatch = (action: Action) => void;

export const DispatchContext = createContext<Dispatch>(() => {});

type Provider = {
  children: React.ReactNode
};

export const StateProvider: React.FC<Provider> = ({ children }) => {
  const [savedTodos, setSavedTodos] = useLocalStorage(
    'todos', initialState.todos,
  );

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    todos: savedTodos || initialState.todos,
  });

  useEffect(() => {
    setSavedTodos(state.todos);
  }, [state.todos, setSavedTodos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
