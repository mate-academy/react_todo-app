import React from 'react';
import { Todo } from '../types/todo';

export const TodosContext = React.createContext({
  todos: [] as Todo[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTodos: (_v: Todo[]) => {},
});
