import React, { createContext, useEffect, useReducer } from 'react';

import { Filter } from '../enums/Filter';
import { Action, reducer, RootState } from '../store/reducer';

const STORAGE_KEY = 'todos';

type ContextType = {
  state: RootState;
  dispatch: React.Dispatch<Action>;
};

export const TodoContext = createContext<ContextType>({} as ContextType);

type ProviderProps = {
  children: React.ReactNode;
};

const getInitialTodos = () => {
  const todosFromStorage = localStorage.getItem(STORAGE_KEY);

  if (!todosFromStorage) {
    return [];
  }

  return JSON.parse(todosFromStorage);
};

const initialState: RootState = {
  todos: getInitialTodos(),
  filter: Filter.All,
};

export const TodoProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
