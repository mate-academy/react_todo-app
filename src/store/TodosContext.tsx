import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Status } from '../types/Status';

type Props = {
  children: React.ReactNode;
};

type TodosContextType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: Status;
  setFilter: (filter: Status) => void;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  filter: Status.ALL,
  setFilter: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState(Status.ALL);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      filter,
      setFilter,
    }),
    [todos, filter, setTodos, setFilter],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
