import React, { useEffect, useReducer } from 'react';
import { Filter } from '../types/Filter';
import { State } from '../types/State';
import { Action, reducer } from './reducer';

const initialState: State = {
  todos: [],
  filterBy: Filter.all,
  addTodo: () => {},
  setTodos: () => {},
};

const getStoredTodos = () => {
  const data = localStorage.getItem('todos');

  return {
    ...initialState,
    todos: data ? JSON.parse(data) : [],
  };
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<State>(initialState);

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, getStoredTodos);

  const { todos } = state;

  useEffect(() => {
    if (todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
