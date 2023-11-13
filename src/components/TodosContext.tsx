import React, { useEffect, useReducer } from 'react';
import { State } from '../types/Todo';
import { Action, reduser } from '../redusecers/reduser';
import { getStoredTodos, saveToLocalStorage } from '../api/localStorageApi';

const initialState: State = getStoredTodos();

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React
  .createContext<React.Dispatch<Action>>(() => { });

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reduser, initialState);

  useEffect(() => {
    if (state) {
      saveToLocalStorage(state);
    }
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
