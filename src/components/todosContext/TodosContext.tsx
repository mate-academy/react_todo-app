/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import { Todo } from '../../types/todo';
import { Status } from '../../types/Status';
import useLocalStorage from '../Hooks/hooks';

interface ContextType {
  items: Todo[];
  setItems: (todo: Todo[]) => void;
  query: Status;
  setQuery: React.Dispatch<React.SetStateAction<Status>>;
}

export const TodosContext = React.createContext<ContextType>({
  items: [],
  setItems: () => { },
  query: Status.All,
  setQuery: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [items, setItems] = useLocalStorage<Todo[]>('todos', []);
  const [query, setQuery] = useState(Status.All);

  const value = useMemo(
    () => ({
      items,
      setItems,
      query,
      setQuery,
    }),
    [items, setItems, query],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
