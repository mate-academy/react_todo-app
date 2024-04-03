import React, { useEffect, useMemo, useState } from 'react';
import { Status, Todos, useLocalStorage } from './store';

type PropsContext = {
  todos: Todos[];
  setTodos: (todos: Todos[]) => void;
  filter: Status;
  setFilter: (filter: Status) => void;
  incompleteCount: number;
};

export const TodosContext = React.createContext<PropsContext>({
  todos: [],
  setTodos: () => {},
  filter: Status.All,
  setFilter: () => {},
  incompleteCount: 0,
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todos[]>('todos', []);
  const [filter, setFilter] = useState(Status.All);

  let incompleteCount = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    incompleteCount = todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const valueTodos = useMemo(
    () => ({
      todos,
      setTodos,
      incompleteCount,
      filter,
      setFilter,
    }),
    [todos, incompleteCount, filter],
  );

  return (
    <TodosContext.Provider value={valueTodos}>{children}</TodosContext.Provider>
  );
};
