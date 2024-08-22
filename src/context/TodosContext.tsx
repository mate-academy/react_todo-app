import React, { createContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

interface TodosContextInterface {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export const TodosContext = createContext<TodosContextInterface>({
  todos: [],
  setTodos: () => {},
  filter: Filter.all,
  setFilter: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<Filter>(Filter.all);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      filter,
      setFilter,
    }),
    [todos, setTodos, filter, setFilter],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
