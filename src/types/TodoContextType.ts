import { Status } from './Status';
import { Todo } from './Todo';

export type TodoContextType = {
  todos: Todo[],
  addTodo: (title: string) => void,
  deleteTodo: (id: number) => void,
  deleteCompletedTodos: () => void,
  updateTodoTitle: (id: number, newTitle: string) => void,
  toggleTodo: (id: number) => void,
  handleToggleAll: () => void,
  filterTodos: (status: Status) => Todo[],
};
