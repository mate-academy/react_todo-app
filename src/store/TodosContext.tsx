import React from 'react';
import { FilterOptions } from '../types/FilterOptions';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
  filter: FilterOptions;
  setTodos: (newTodo: Todo[]) => void;
  setFilter: (filter: FilterOptions) => void;
}

export const TodosContext = React.createContext<Props>({
  todos: [],
  filter: FilterOptions.All,
  setTodos: () => {},
  setFilter: () => {},
});
