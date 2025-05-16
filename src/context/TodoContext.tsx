import React, { createContext, useContext } from 'react';
import { useGeneral } from '../hooks/General';

export const TodoContext = createContext<ReturnType<typeof useGeneral> | null>(
  null,
);

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
};

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const general = useGeneral();

  return (
    <TodoContext.Provider value={general}>{children}</TodoContext.Provider>
  );
};
