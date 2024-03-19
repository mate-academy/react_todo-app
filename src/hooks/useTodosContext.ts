import { useContext } from 'react';
import { TodosContext } from '../TodosContext';

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error(
      'useTodosContext must be used within a TodosContextProvider',
    );
  }

  return context;
};
