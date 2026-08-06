import { useContext } from 'react';
import { TodosStateContext } from '../contexts/TodosContext';

export const useFilter = () => {
  const value = useContext(TodosStateContext);

  if (!value) {
    throw new Error('useFilter must be used within a TodosProvider');
  }

  return value.filter;
};
