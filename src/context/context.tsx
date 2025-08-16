import { createContext } from 'react';
import { Todo } from '../types/Todo';

export const TodosContext = createContext<Todo[] | []>([]);
export const VisibleTodosContext = createContext<Todo[] | []>([]);
