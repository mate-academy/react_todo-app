import React from 'react';
import { Todo } from '../types/Todo';
import { FilterOptions } from '../types/FilterOptions';

type Props = {
  todos: Todo[];
  filter: FilterOptions
  setTodos: (newTodos: Todo[]) => void;
  setFilter: (filter: FilterOptions) => void;
};

export const TodosContext = React.createContext<Props>({
  todos: [],
  filter: FilterOptions.ALL,
  setTodos: () => {},
  setFilter: () => {},
});
