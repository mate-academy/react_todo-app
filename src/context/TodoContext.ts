import { createContext } from 'react';
import { type TodoContextType } from '../types/types';

const defaultTodoContextValue: TodoContextType = {
  todos: [],
  filteredTodos: [],
  filter: 'all',
  setFilter: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodo: () => {},
  toggleAll: () => {},
  updateTodo: () => {},
  clearCompleted: () => {},
};

export const TodoContext = createContext<TodoContextType>(
  defaultTodoContextValue,
);
