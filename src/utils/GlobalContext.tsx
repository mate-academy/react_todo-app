import React from 'react';
import { ContextPropsFilteredTodos, ContextPropsMyTodos } from './helpers';

export const MyTodos = React.createContext<ContextPropsMyTodos>({
  todos: [],
  setTodos: () => {},
});

export const FilteredTodos = React.createContext<ContextPropsFilteredTodos>({
  filteredTodos: [],
  setFilteredTodos: () => {},
});
