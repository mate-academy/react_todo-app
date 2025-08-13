import React, { useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Todo } from '../../type/Todo';

export const TodoContext = React.createContext({
  todos: [],
  setTodos: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('id', []);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos, setTodos],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
