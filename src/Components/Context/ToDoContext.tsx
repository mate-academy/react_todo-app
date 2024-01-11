import React, { useState } from 'react';
import { Todo } from '../../Types/Todo';
import { Status } from '../../Types/Status';
import { useLocaleStorage } from '../../hooks/useLocaleStorage';

type PropsTodoContext = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: string;
  setFilter: (filter: string) => void;
};

export const TodoContext = React.createContext<PropsTodoContext>({
  todos: [],
  setTodos: () => {},
  filter: '',
  setFilter: () => {},
});

type Props = {
  children: React.ReactNode
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<string>(Status.ALL);
  const val = {
    todos,
    setTodos,
    filter,
    setFilter,
  };

  return (
    <TodoContext.Provider value={val}>
      {children}
    </TodoContext.Provider>
  );
};
