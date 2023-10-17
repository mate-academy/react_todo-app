import { Status } from './Status';
import { Todo } from './Todo';

export type Context = {
  todos: Todo[],
  addTodo: (title: string) => void,
  editTodo: (todoId: number, newTitle: string) => void,
  deleteTodo: (todoId: number) => void,
  toggleCompleted: (todoId: number) => void,
  toggleAll: () => void,
  filterTodos: (filterType: Status) => Todo[],
  clearCompleted: () => void,
  todoCount: number,
  isCompleted: boolean,
};
