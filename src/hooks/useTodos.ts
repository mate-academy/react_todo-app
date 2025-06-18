import { useContext } from 'react';
import { TodoContext } from '../entities/TodoContex';

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
};
