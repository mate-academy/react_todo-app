import React, { useContext } from 'react';
import { useTodos } from '../hooks/UseTodos';

type Props = {
  children: React.ReactNode;
};

type TodoContextType = ReturnType<typeof useTodos>;

export const TodoContext = React.createContext<TodoContextType | null>(null);

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const value = useTodos();

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodosContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodosContext must be used within TodoProvider');
  }

  return context;
};
