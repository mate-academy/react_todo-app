import { useContext } from 'react';
import { TodoContext } from '../TodosContext';

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
