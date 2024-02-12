import React, { useEffect, useReducer } from 'react';
import { State } from '../types/State';
import { Status } from '../types/status';
import { Action, reducer } from './Reducer';

const initialState: State = {
  todos: [],
  filterBy: Status.ALL,
};

const getStoredTodos = () => {
  const data = localStorage.getItem('todos');

  return {
    ...initialState,
    todos: data ? JSON.parse(data) : [],
  };
};

export const stateContext = React.createContext(initialState);
export const dispatchContext = React
  .createContext<React.Dispatch<Action>>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
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
    <dispatchContext.Provider value={dispatch}>
      <stateContext.Provider value={state}>
        {children}
      </stateContext.Provider>
    </dispatchContext.Provider>
  );
};
