import { useContext } from 'react';
import { TodoDataContext } from '../Contexts/TodoDataContext';

export const useTodoData = () => {
  const ctx = useContext(TodoDataContext);

  if (!ctx) {
    throw new Error('useTodo must be used within TodoProvider');
  }

  return ctx;
};
