import { Todo } from './Todo.type';
import { TodoFilters } from './TodoFilters.type';

export type TodoContextType = {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: TodoFilters;
  setFilter: (filter: TodoFilters) => void;
  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  toggleAll: (completed: boolean) => void;
  updateTodo: (id: string, title: string) => void;
  clearCompleted: () => void;
};
