/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { FC, ReactNode, useMemo, useReducer } from 'react';
import {
  LOCAL_STORAGE_TODOS_KEY,
  TodosStateContext,
} from '../lib/TodosContext';
import { ITodosState } from '../lib/types';
import { TodoStatus } from '../../../types/Todo';
import { reducer } from '../lib/reducer';

if (!localStorage.getItem(LOCAL_STORAGE_TODOS_KEY)) {
  localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify([]));
}

const initialState: ITodosState = {
  todos:
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEY) as string) || [],
  filterByStatus: TodoStatus.All,
};

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
