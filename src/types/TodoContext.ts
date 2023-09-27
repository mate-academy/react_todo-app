import { Status } from './StatusEnum';
import { Todo } from './Todo';

export interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodoTitle: (id: number, newTitle: string) => void;
  deleteCompletedTodos: () => void;
  handleToggleAll: () => void;
  filterTodos: (filterStatus: Status) => Todo[];
  hasCompletedTodos: boolean;
  incompletedTodosCount: number;
}
