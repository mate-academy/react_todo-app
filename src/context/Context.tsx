/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { State, Actions } from '../types';
import { useLocalReduceStorage } from '../helper';

type Props = {
  children: React.ReactNode;
};

const initialTodo: State = {
  todos: [],
};

export const StateTodo = React.createContext(initialTodo);
export const DispatchTodo = React.createContext((_action: Actions) => {});

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useLocalReduceStorage('todos', initialTodo);

  return (
    <DispatchTodo.Provider value={dispatch}>
      <StateTodo.Provider value={state}>
        {children}
      </StateTodo.Provider>
    </DispatchTodo.Provider>
  );
};
