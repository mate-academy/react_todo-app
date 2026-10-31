import { createContext } from 'react';
import { Todo } from '../types/Todo';

type TodosContextType = {
  todos: Todo[];
};

export const TodosContext = createContext<TodosContextType>({
  todos: [],
});
