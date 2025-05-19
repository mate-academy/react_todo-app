import { createContext, useContext } from 'react';
import { TodoContextType } from '../types/types';

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
};
