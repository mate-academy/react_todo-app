import { Status } from './Status';
import { Todo } from './Todo';

export interface TodoContextType {
  todos: Todo[];
  filteredTodos: Todo[],
  addTodo: (todo: Todo) => void;
  completeAll: () => void;
  deleteCompleted: () => void;
  deleteTodo: (todo: Todo) => void,
  updateTodo: (todo: Todo) => void,
  status: Status;
  changeStatus: (status: Status) => void;
}
