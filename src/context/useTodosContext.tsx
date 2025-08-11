import { useContext } from 'react';
import { TodosContext, TodosContextType } from './TodosContext';

export function useTodosContext(): TodosContextType {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('TodosContext must be used within a TodosProvider');
  }

  return context;
}
