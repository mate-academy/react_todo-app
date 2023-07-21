import { createContext } from 'react';
import { Todo } from '../types/Todo';

type SetTodos = (todos: Todo[]) => void;

export const TodosContext = createContext<[Todo[], SetTodos]>(
  [[], {} as SetTodos],
);
