import { useContext } from 'react';
import { TodosContext } from '../hoc/TodosProvider';

export const useTodos = () => {
  return useContext(TodosContext);
};
