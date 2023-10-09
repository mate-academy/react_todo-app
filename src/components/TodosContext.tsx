import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Status } from '../types';

export type Todo = {
  id: number,
  title: string,
  completed: boolean,
};

type Props = {
  children: React.ReactNode;
};

type TodosContextType = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
  filter: Status;
  setFilter: React.Dispatch<React.SetStateAction<Status>>;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => { },
  filter: Status.All,
  setFilter: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<Status>(Status.All);

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        filter,
        setFilter,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
