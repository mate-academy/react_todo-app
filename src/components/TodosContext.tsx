import React from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/filter';

type Props = {
  todos: Todo[];
  setTodos: (newTodos: Todo[]) => void;
  filterType: Filter;
  setFilterType: (filter: Filter) => void;
};

export const TodosContext = React.createContext<Props>({
  todos: [],
  setTodos: () => {},
  filterType: Filter.ALL,
  setFilterType: () => {},
});
