import React, { useState } from 'react';
import { Todo, Status } from '../../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  todos: Todo[];
  setTodos: (todoArr: Todo[]) => void;
  filterStatus: Status;
  setFilterStatus: React.Dispatch<React.SetStateAction<Status>>;
};

export const TodoContext = React.createContext<ContextType>({
  todos: [],
  setTodos: () => {},
  filterStatus: Status.All,
  setFilterStatus: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterStatus, setFilterStatus] = useState(Status.All);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        filterStatus,
        setFilterStatus,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
