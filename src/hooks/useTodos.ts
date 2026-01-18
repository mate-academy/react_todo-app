import { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

export const useTodos = () => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error('Something went wrong');
  }

  return todosContext;
};
