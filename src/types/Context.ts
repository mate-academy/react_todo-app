import { Todo } from './Todo';

export interface Context {
  todos: Todo[],
  todoCount: number,
  completedTodos: boolean,
  addTodo: (title: string) => void,
  toggleTodo: (id: number) => void,
  handleToggleAll: () => void,
  removeTodo: (id: number) => void,
  deleteCompletedTodos: () => void,
  filterTodos: (filter: string) => Todo[],
  editTodo: (id: number, newTitle: string) => void,
}
