import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type TodosContextType = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  filterValue: Status,
  setFilterValue: React.Dispatch<React.SetStateAction<Status>>;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  filterValue: Status.All,
  setFilterValue: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const [filterValue, setFilterValue] = useState<Status>(Status.All);

  const value = {
    todos,
    setTodos,
    filterValue,
    setFilterValue,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
