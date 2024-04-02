import React, { useEffect, useMemo, useState } from 'react';

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const filterTodos = (t: Todos[], filter: string) => {
  switch (filter) {
    case Status.Active:
      return t.filter(todo => !todo.completed);
    case Status.Completed:
      return t.filter(todo => todo.completed);
    default:
      return t;
  }
};

export type Todos = {
  id: number;
  title: string;
  completed: boolean;
};

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
  const [todos, setTodos] = useState<Todos[]>([]);
  const [filter, setFilter] = useState(Status.All);

  const [incompleteCount, setIncompleteCount] = useState(
    todos.filter(todo => !todo.completed).length,
  );

  useEffect(() => {
    const newIncompleteCount = todos.filter(todo => !todo.completed).length;

    setIncompleteCount(newIncompleteCount);
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
