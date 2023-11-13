import { Status } from './Status';
import { Todo } from './Todo';

export type Context = {
  todos: Todo[];
  filteredTodos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
  deleteCompletedTodos: () => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  activeTodoCount: number;
  hasCompletedTodos: boolean;
  filter: Status;
  onFilterChange: (filterBy:Status) => void;
};
