import React, { useMemo, useState } from 'react';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../utils/useLocalStorage';

interface TodosContextType {
  todos: Todo[];
  setTodos: (todo: Todo[]) => void;
  query: Status;
  setQuery: React.Dispatch<React.SetStateAction<Status>>;
}

interface Props {
  children: React.ReactNode;
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  query: Status.All,
  setQuery: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [query, setQuery] = useState(Status.All);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      query,
      setQuery,
    }),
    [todos, query, setTodos],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
