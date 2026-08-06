import { useContext } from 'react';
import { TodosStateContext } from '../contexts/TodosContext';

export const useTodos = () => {
  const value = useContext(TodosStateContext);

  if (!value) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return value.todos;
};
