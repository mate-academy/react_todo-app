import { createContext, useContext } from 'react';
import { Todo } from '../types/Todo';
import { FilterStatus } from '../types/FilterStatus';

export type TodoContextType = {
  todos: Todo[];
  visibleTodos: Todo[];
  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;

  allCompleted: boolean;
  toggleAll: () => void;

  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (
    todo: Todo,
    changes: Partial<Pick<Todo, 'title' | 'completed'>>,
  ) => void;
  clearCompleted: () => void;
  error: string;
  setError: (value: string) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export function useTodos() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used inside TodoProvider');
  }

  return context;
}
