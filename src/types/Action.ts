import { Status } from './Status';
import { Todo } from './Todo';

export enum Type {
  AddTodo = 'addTodo',
  ToggleAllChecked = 'toggleAllChecked',
  ClearCompleted = 'clearCompleted',
  UpdateTodo = 'updateTodo',
  UpdateTodoCheckStatus = 'updateTodoCheckStatus',
  DeleteTodo = 'deleteTodo',
  setStatus = 'setStatus',
  setTitle = 'setTitle',
  setEditingId = 'setEditingId',
}

export type Action =
  | { type: Type.ToggleAllChecked }
  | { type: Type.ClearCompleted }
  | { type: Type.AddTodo; payload: Todo }
  | { type: Type.UpdateTodo; payload: Todo }
  | { type: Type.UpdateTodoCheckStatus; payload: Todo }
  | { type: Type.DeleteTodo; payload: Todo }
  | { type: Type.setStatus; payload: Status }
  | { type: Type.setEditingId; payload: number | undefined }
  | { type: Type.setTitle; payload: string };
