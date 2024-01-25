import { Todo } from './Todo';

export type TodoUpdateContextType = {
  addTodo: (todo: Todo) => void;
  completeAll: () => void;
  deleteCompleted: () => void;
  deleteTodo: (todo: Todo) => void,
  updateTodo: (todo: Todo) => void,
};
