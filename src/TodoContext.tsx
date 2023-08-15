import React, { useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoContextType } from './types/TodoContexType';

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const value = useMemo(() => ({
    todos,
    setTodos,
  }), [todos]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
