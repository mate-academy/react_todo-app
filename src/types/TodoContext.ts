import { Todo } from './Todo';

export type TodoContext = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodoTitle: (id: number, editedTitle: string) => void;
  deleteCompletedTodos: () => void;
  handleToggleAll: () => void;
  incompletedTodoCount: number;
  hasCompletedTodos: boolean;
  filterTodos: (filterStatus: string) => Todo[];
};
