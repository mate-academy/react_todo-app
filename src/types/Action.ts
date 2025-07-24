import { Todo } from './Todo';

export type Action =
  | { type: 'addTodo'; newTodo: Todo }
  | { type: 'updateTodo'; updatedTodo: Todo }
  | { type: 'deleteTodo'; todoId: number }
  | { type: 'deleteCompletedTodo' }
  | { type: 'toggleTodos'; updatedTodos: Todo[] };
