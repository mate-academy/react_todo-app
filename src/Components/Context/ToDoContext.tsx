import React, { useState } from 'react';
import { Todo } from '../../Types/Todo';
import { Status } from '../../Types/Status';
import { useLocaleStorage } from '../../hooks/useLocaleStorage';

type PropsToDoContext = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: string;
  setFilter: (filter: string) => void;
};

export const ToDoContext = React.createContext<PropsToDoContext>({
  todos: [],
  setTodos: () => {},
  filter: '',
  setFilter: () => {},
});

type Props = {
  children: React.ReactNode
};

export const ToDoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<string>(Status.ALL);
  const val = {
    todos,
    setTodos,
    filter,
    setFilter,
  };

  return (
    <ToDoContext.Provider value={val}>
      {children}
    </ToDoContext.Provider>
  );
};
