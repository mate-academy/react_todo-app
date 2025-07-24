import React, { createContext, useEffect, useReducer, useRef } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from './utils/localStorage';
import { RootState } from './types/RootState';
import { reducer } from './utils/reducer';
import { Action } from './types/Action';
import { LOCAL_STORAGE_KEY } from './constants/appConstants';

const initialState: RootState = {
  todos: getFromLocalStorage('todos', []),
};

export const StateContext = React.createContext<RootState>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);
export const FocusContext =
  createContext<React.RefObject<HTMLInputElement> | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputHeaderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_KEY, state.todos);
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <FocusContext.Provider value={inputHeaderRef}>
          {children}
        </FocusContext.Provider>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
