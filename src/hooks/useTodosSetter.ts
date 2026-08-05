import { useContext } from 'react';
import { TodosSetterContext } from '../contexts/TodosContext';

export const useTodosSetter = () => {
  const todosSetter = useContext(TodosSetterContext);

  if (!todosSetter) {
    throw new Error('useTodosSetter must be used within a TodosProvider');
  }

  return todosSetter;
};
