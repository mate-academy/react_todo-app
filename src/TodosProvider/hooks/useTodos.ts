import { useContext } from 'react';

import { TodosContext } from '../TodosContext';
import { TodosContextType } from '../types/TodosContextType';

export const useTodos = (): TodosContextType => useContext(TodosContext);
