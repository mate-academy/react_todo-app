import React from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type Action =
  | { type: 'todos'; payload: Todo[] }
  | { type: 'filter'; payload: Status };

interface State {
  todos: Todo[];
  filter: Status;
}

const initialState: State = {
  todos: [],
  filter: Status.all,
};

type InitialDispatch = (action: Action) => void;

export const TodosContext = React.createContext(initialState);
export const DispatchContext = React.createContext<InitialDispatch>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalTodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useLocalStorage(initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={state}>{children}</TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
