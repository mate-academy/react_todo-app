/* eslint-disable @typescript-eslint/indent */
import React, { ReactNode, useMemo } from 'react';
import { useLocalStorage } from '../hooks/uselocalstorage';
import { Todo } from '../types/Todo';

export const TodoContext = React.createContext<{
  todos: Todo[];
  setTodos: (newValue: Todo[]) => void;
}>({
  todos: [],
  setTodos: () => {},
});

type Props = {
  children: ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos, setTodos],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
