import React, { useMemo, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Todo } from '../../types/todo';
import { Status } from '../../enums/Status';

type ProviderProps = {
  children: React.ReactNode,
};

type ContextType = {
  todos: Todo[],
  setTodos: ((v: Todo[]) => void),
  status: Status,
  setStatus: ((v: Status) => void),
};

const initialValue: ContextType = {
  todos: [],
  setTodos: () => {},
  status: Status.All,
  setStatus: () => {},
};

export const TodosContext = React.createContext<ContextType>(initialValue);

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [status, setStatus] = useState(Status.All);

  const value = useMemo(() => ({
    todos,
    setTodos,
    status,
    setStatus,
  }), [todos, status, setTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
