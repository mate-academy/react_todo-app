import React, { useEffect, useReducer } from 'react';
import { Action, reduser } from '../redusecers/reduser';
import { saveToLocalStorage } from '../api/localStorageApi';
import { initialState } from '../utils/utils';

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React
  .createContext<React.Dispatch<Action>>(() => { });

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reduser, initialState);

  useEffect(() => {
    if (state.todos) {
      saveToLocalStorage(state.todos);
    }
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
