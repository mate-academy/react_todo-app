import React, { useEffect, useReducer } from 'react';
import { State } from '../types/State';
import { Action, reducer } from './Reducer';
import { Filter } from '../types/Filter';

const initialState: State = {
  todos: [],
  filterBy: Filter.all,
};

const getStoredTodos = () => {
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
    reducer,
    initialState,
    getStoredTodos,
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
