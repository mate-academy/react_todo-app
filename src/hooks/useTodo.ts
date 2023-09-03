import React from 'react';
import { TodosContextType } from '../types/TodosContextType';
import { TodosContext } from '../TodosContext/TodosContext';

export const useTodos = (): TodosContextType => React.useContext(TodosContext);
