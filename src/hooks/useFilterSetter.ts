import { useContext } from 'react';
import { TodosSetterContext } from '../contexts/TodosContext';

export const useSetFilter = () => {
  const value = useContext(TodosSetterContext);

  if (!value) {
    throw new Error('useFilterSetter must be used within a TodosProvider');
  }

  return value.setFilter;
};
