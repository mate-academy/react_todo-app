import { useContext } from 'react';
import { TodosSettersContext } from '../contexts/TodosContext';

export const useSetFilter = () => {
  const value = useContext(TodosSettersContext);

  if (!value) {
    throw new Error('useSetFilter must be used within a TodosProvider');
  }

  return value.setFilter;
};
