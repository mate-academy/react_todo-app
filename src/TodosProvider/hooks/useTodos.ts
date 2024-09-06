import { useContext } from 'react';

import { TodosContext } from '../TodosContext';
// eslint-disable-next-line max-len
import { TodosContextType } from '../types/TodosContextType';

export const useTodos = (): TodosContextType => useContext(TodosContext);
