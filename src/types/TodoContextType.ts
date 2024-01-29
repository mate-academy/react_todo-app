import { Status } from './Status';
import { Todo } from './Todo';

export interface TodoContextType {
  todos: Todo[],
  filteredTodos: Todo[],
  status: Status,
  addTodo: (todo: Todo) => void;
  deleteTodo: (todoIdToDelete: number) => void;
  updateTodo: (todo: Todo) => void;
  completeAllTodos: () => void
  changheStatus: (newStatus: Status) => void,
  deleteCompletedTodos: () => void,
}
