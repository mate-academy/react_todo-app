import { createContext, useContext } from 'react';
import { FILTERS, FilterType } from '../constants/filters';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  toggleAll: () => {},
  clearCompleted: () => {},
  filter: FILTERS.all,
  setFilter: () => {},
});

export const useTodos = () => useContext(TodoContext);
