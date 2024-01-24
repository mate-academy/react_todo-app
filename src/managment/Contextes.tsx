import React, { useReducer, useEffect } from 'react';
import { State } from '../types/State';
import { Filter } from '../types/Filter';
import { Action, reduser } from './reduser';

const initialState: State = {
  todos: [],
  filterTp: Filter.all,
};

const useLocalStorege = () => {
  const data = localStorage.getItem('todos');

  return {
    ...initialState,
    todos: data ? JSON.parse(data) : [],
  };
};

export const StateContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext<React.Dispatch<Action>>(() => {});

type Props = {
  children: React.ReactNode,
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    reduser,
    initialState,
    useLocalStorege,
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
