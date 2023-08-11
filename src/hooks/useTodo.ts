import React from 'react';
import { TodosContext } from '../TodosContext';
import { TodosContextType } from '../types/TodosContext';

export const useTodo = (): TodosContextType => React.useContext(TodosContext);
