import { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

export const useTodos = () => useContext(TodosContext);
