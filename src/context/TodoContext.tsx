import React, { createContext } from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  filter: 'All',
  setFilter: () => {},
});
