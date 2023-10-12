import { createContext } from 'react';
import { Todo } from '../types/Todo';

export const TodosContext = createContext({
  todos: [] as Todo[],
  setNewTodos(newTodos: Todo[]) {
    return newTodos;
  },
});
