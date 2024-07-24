import { TodosContext } from './TodosContext';
import { useContext } from 'react';

export const useTodosContext = () => useContext(TodosContext);
