import { createContext } from 'react';
import { Todo } from './types/Todo';

type TodosContextType = {
  todos: Todo[];
  saveTodos: (todos: Todo[]) => void;
};
export const TodosContext = createContext<TodosContextType>({
  todos: [],
  saveTodos: () => {},
});
