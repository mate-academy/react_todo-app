import React, { useReducer } from 'react';
import { Status } from '../types/Status';
import { RootState } from '../types/RootState';
import { Action } from '../types/Action';
import { reducer } from './Reducer';

const initialState: RootState = {
  todos: [],
  inputHeaderRef: null,
  filterActions: Status.ALL,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
