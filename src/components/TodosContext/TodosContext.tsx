import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Todo } from '../../type/Todo';
import { useLocalStorage } from '../../hooks/UseLocalStorage';
import { Filter } from '../../type/Filter';

type DefaultValue = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
  filter: Filter;
  setFilter: (v: Filter) => void;
  choseEditItem: number | null;
  setChoseEditItem: (v: number | null) => void;
};

export const TodosContext = createContext<DefaultValue>({
  todos: [],
  setTodos: ([]) => {},
  filter: Filter.All,
  setFilter: () => {},
  choseEditItem: null,
  setChoseEditItem: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState(Filter.All);
  const [choseEditItem, setChoseEditItem] = useState<number | null>(null);

  useEffect(() => {
    setTodos(todos);
  }, [todos, setTodos]);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      filter,
      setFilter,
      choseEditItem,
      setChoseEditItem,
    }),
    [todos, setTodos, filter, choseEditItem],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
