import React from 'react';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

type Props = {
  todos: Todo[],
  filter: FilterType.ALL,
  setTodos: (newTodos: Todo[]) => void;
  setFilter: (filter: FilterType) => void;
};

export const todoContext = React.createContext<Props>({
  todos: [],
  setTodos: () => {},
  filter: FilterType.ALL,
  setFilter: () => {},
});
