import React, { useEffect, useReducer } from 'react';
import { initialState, reducer } from './todoReducer';
import { Action } from './types';

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const localData = localStorage.getItem('todos');

    if (localData) {
      try {
        return { ...initialState, todos: JSON.parse(localData) };
      } catch (e) {
        return initialState;
      }
    }

    return initialState;
  });

  useEffect(() => {
    if (state.todos) {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
