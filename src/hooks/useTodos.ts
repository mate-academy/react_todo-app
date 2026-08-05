import { useContext } from 'react';
import { TodosStateContext } from '../contexts/TodosContext';

export const useTodos = () => {
  const todos = useContext(TodosStateContext);

  if (!todos) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return todos;
};
