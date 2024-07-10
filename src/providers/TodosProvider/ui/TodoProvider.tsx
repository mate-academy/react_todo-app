/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { FC, ReactNode, useMemo, useReducer } from 'react';
import {
  LOCAL_STORAGE_TODOS_KEY,
  TodosStateContext,
} from '../lib/TodosContext';
import { ITodosAction, ITodosState } from '../lib/types';

const initialState: ITodosState = {
  todos: !!localStorage.getItem(LOCAL_STORAGE_TODOS_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEY) as string)
    : [],
};

function reducer(state: ITodosState, action: ITodosAction): ITodosState {
  let updatedTodos;

  switch (action.type) {
    case 'add':
      updatedTodos = [
        ...state.todos,
        {
          id: +Date.now(),
          completed: false,
          title: action.payload,
        },
      ];

      localStorage.setItem(
        LOCAL_STORAGE_TODOS_KEY,
        JSON.stringify(updatedTodos),
      );

      return {
        ...state,
        todos: updatedTodos,
      };

    case 'update':
      updatedTodos = state.todos.map(todo =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
      );

      localStorage.setItem(
        LOCAL_STORAGE_TODOS_KEY,
        JSON.stringify(updatedTodos),
      );

      return {
        ...state,
        todos: updatedTodos,
      };

    case 'remove':
      updatedTodos = state.todos.filter(todo => todo.id !== action.payload);

      localStorage.setItem(
        LOCAL_STORAGE_TODOS_KEY,
        JSON.stringify(updatedTodos),
      );

      return {
        ...state,
        todos: updatedTodos,
      };

    default:
      return state;
  }
}

interface Props {
  children: ReactNode;
}

export const GlobalTodosState: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state]);

  return (
    <TodosStateContext.Provider value={value}>
      {children}
    </TodosStateContext.Provider>
  );
};
