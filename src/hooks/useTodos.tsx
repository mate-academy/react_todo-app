import { useContext } from 'react';
import { TodosContext } from '../GlobalProvider';

export const useTodos = () => useContext(TodosContext);
