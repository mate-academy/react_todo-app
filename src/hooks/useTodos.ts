import { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';
import { TodosContextType } from '../types/TodosContextType';

export const useTodos = (): TodosContextType => useContext(TodosContext);
