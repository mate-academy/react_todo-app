import { Todo } from './Todo';

export type Context = {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  editingTodo: (id: number, newTitle: string) => void;
  deleteCompletedTodos: () => void;
  toggleTodo: (id: number) => void;
  handlerToggleAll: () => void;
  todoCount: number;
  completedTodos: boolean;
  filterTodos: (filter: string) => Todo[];
};
