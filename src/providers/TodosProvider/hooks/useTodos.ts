import { useContext } from 'react';

import { TodosContext } from '../contexts/TodosContext';

export const useTodos = () => useContext(TodosContext);
