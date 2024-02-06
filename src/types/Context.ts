import { Todo } from './Todo';

export type Context = {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  changeSelectedTodo: (id: number, newTitle: string) => void;
  deleteCompletedTodos: () => void;
  toggleSelectedTodo: (id: number) => void;
  toggleCompletionOfAllTodos: () => void;
  todoCount: number;
  completedTodos: boolean;
  filterTodos: (filter: string) => Todo[];
};
