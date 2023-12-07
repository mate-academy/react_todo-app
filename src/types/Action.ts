import { Todo } from './Todo';

export type Action =
  { type: 'addTodo', title: string }
  | { type: 'destroyTodo', todoId: number }
  | { type: 'destroyCompletedTodo' }
  | { type: 'toggleTodoStatus', todoId: number }
  | { type: 'toggleAllTodoStatus' }
  | { type: 'editTodo', todoId: number, newTitle: string }
  | { type: 'setInitialTodoList', todoList: Todo[] };
