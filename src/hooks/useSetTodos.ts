import { useContext } from 'react';
import { TodosSettersContext } from '../contexts/TodosContext';

export const useSetTodos = () => {
  const value = useContext(TodosSettersContext);

  if (!value) {
    throw new Error('useSetTodos must be used within a TodosProvider');
  }

  return value.setTodos;
};
