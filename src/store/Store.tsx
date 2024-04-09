import React from 'react';
import { Status } from '../types/Status';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Action } from '../types/Action';
import { State } from '../types/State';

const initialState: State = {
  todos: [],
  filter: Status.all,
  selectedTodo: null,
};

type InitialDispatch = (action: Action) => void;

export const TodosContext = React.createContext(initialState);
export const DispatchContext = React.createContext<InitialDispatch>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalTodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useLocalStorage([]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={state}>{children}</TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
