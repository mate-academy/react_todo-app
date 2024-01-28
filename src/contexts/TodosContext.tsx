import React, { useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todos } from '../types/Todos';
import { Status } from '../types/Status';

type TodosContextProps = {
  todos: Todos;
  setTodos: React.Dispatch<React.SetStateAction<Todos>>;
  filterStatus: Status;
  setFilterStatus: React.Dispatch<React.SetStateAction<Status>>;
};

type TodosProviderProps = {
  children: React.ReactNode;
};

export const TodosContext = React.createContext<TodosContextProps>({
  todos: [],
  setTodos: () => {},
  filterStatus: Status.All,
  setFilterStatus: () => {},
});

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todos>('todos', []);
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);

  const value = useMemo(() => ({
    todos,
    setTodos,
    filterStatus,
    setFilterStatus,
  }), [todos, setTodos, filterStatus]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
