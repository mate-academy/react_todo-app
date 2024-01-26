import { Todo } from './Todo';

export interface TodoUpdateContextType {
  addTodo: (todo: Todo) => void;
  completeAll: () => void;
  deleteCompleted: () => void;
  deleteTodo: (todo: Todo) => void,
  updateTodo: (todo: Todo) => void,
}
