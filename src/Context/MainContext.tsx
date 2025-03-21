/* eslint-disable @typescript-eslint/indent */
import React, { useReducer } from 'react';
import reducer from './reduser';
import { Action, GlobalState } from './types';

type Props = {
  children: React.ReactNode;
};

if (!JSON.parse(localStorage.getItem('todos') ?? '[]').length) {
  localStorage.setItem('todos', '[]');
}

const initialState: GlobalState = {
  todos: JSON.parse(localStorage.getItem('todos') ?? '[]'),
  mainInputHTMLElement: null,
  filterType: 'All',
};

export const StateContext = React.createContext<GlobalState>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

const MainContext: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default MainContext;
