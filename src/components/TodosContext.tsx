import React from 'react';
import { TodosContextProps } from '../types/TodosContextProps';
import { Filter } from '../types/Filter';

export const TodosContext = React.createContext<TodosContextProps>({
  todos: [],
  filteredTodos: [],
  filterType: Filter.ALL,
  setTodos: () => {},
  setFilterType: () => {},
});
