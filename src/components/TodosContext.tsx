import React, { useEffect, useReducer } from 'react';

import { initialState } from '../constants/initialState';
import { Action } from '../types/Action';
import { reducer } from '../helpers/reducer';
import { getLocalStorageValue } from '../helpers/getLocalStorageValue';

export const StateContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext<(action: Action) => void>(() => {});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    getLocalStorageValue,
  );

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
