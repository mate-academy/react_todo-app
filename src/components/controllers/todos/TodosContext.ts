import React from 'react';
import { Filters, Todo } from '../../../types';

export interface TodosContextType {
  todos: Todo[];
  errorMessage: string;
  selectedFilter: Filters;
  onChangeFilters: (filter: Filters) => void;
  onChangeErrorMessage: (message: string) => void;
  onDelete: (todoId: number) => void;
  onDeleteCompletedTodos: () => void;
  onEdit: (todo: Todo, key: keyof Todo, value: boolean | string) => void;
  onToggleTodos: () => void;
  onAddTodo: (newTodo: Todo) => void;
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  errorMessage: '',
  selectedFilter: Filters.All,
  onChangeFilters: () => {},
  onChangeErrorMessage: () => {},
  onDelete: () => {},
  onDeleteCompletedTodos: () => {},
  onEdit: () => {},
  onToggleTodos: () => {},
  onAddTodo: () => {},
});
