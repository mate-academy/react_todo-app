import React, { useEffect, useReducer } from 'react';
import { initialState, reducer } from './todoReducer';
//import { Action } from './types';

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext(() => {});

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
        //console.log(e + 'error');

        return initialState;
      }
    }

    return initialState;
  });

  //console.log(state);

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
