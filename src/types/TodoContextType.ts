import { Status } from './Status';
import { Todo } from './Todo';

export interface TodoContextType {
  todos: Todo[],
  filteredTodos: Todo[],
  status: Status,
  addTodo: (newTodo: Todo) => void,
  updateTodo: (upadatedTodo: Todo) => void,
  deleteTodo: (todoToDeleteID: number) => void,
  completeAllTodos: () => void,
  deleteCompletedTodos: () => void,
  changeStatus: (newStatus: Status) => void,
}
