import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { filters } from './lib/filters';
import { Action } from './types/Action';
import { State } from './types/State';

const defaultDispatch: React.Dispatch<Action> = () => {};

const initialState: State = {
  todos: [],
  filter: filters[0],
};

export const DispatchContext = React.createContext(defaultDispatch);
export const StateContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useLocalStorage(initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
