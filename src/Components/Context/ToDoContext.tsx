import React, { useState, useMemo } from 'react';
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
  const val = useMemo(() => ({
    todos,
    setTodos,
    filter,
    setFilter,
  }), [todos, filter, setTodos]);

  return (
    <TodoContext.Provider value={val}>
      {children}
    </TodoContext.Provider>
  );
};
