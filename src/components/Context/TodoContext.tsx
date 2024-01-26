import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { Status } from '../../types/Status';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  todos: Todo[];
  setTodos: (todoArr: Todo[]) => void;
  filterStatus: Status;
  setFilterStatus: React.Dispatch<React.SetStateAction<Status>>
};

export const TodosContext = React.createContext<ContextType>({
  todos: [],
  setTodos: () => {},
  filterStatus: Status.All,
  setFilterStatus: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterStatus, setFilterStatus] = useState(Status.All);

  return (
    <TodosContext.Provider value={{
      todos,
      setTodos,
      filterStatus,
      setFilterStatus,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
