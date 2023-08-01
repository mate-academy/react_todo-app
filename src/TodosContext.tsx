import { createContext } from 'react';
import { Todo } from './types/Todo';

export type TodoContextType = {
  todos: Todo[];
  setTodos: (todo: Todo[]) => void,
};

export const TodosContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
});
