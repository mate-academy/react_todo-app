import React, { useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TodoContextType } from '../types/TodoContextType';
import { Todo } from '../types/Todo';

export const TodoContext = React.createContext<TodoContextType>(null!);

type Props = {
  children: React.ReactNode;
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
