import { Todo } from './Todo';

export interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodoTitle: (id: number, newTitle: string) => void;
  deleteCompletedTodos: () => void;
  handleToggleAll: () => void;
  incompletedTodosCount: number;
  hasCompletedTodos: boolean;
  filterTodos: (filterStatus: string) => Todo[];
}
