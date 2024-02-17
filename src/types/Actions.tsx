import { Status } from './Status';
import { Todo } from './Todo';

export enum ActionTypes {
  AddTodo = 'addTodo',
  UpdateTodo = 'editTodo',
  DeleteTodo = 'deleteTodo',
  ToggleStatus = 'toggleStatus',
  ToggleStatusAll = 'toggleStatusAll',
  DeleteCompletedTodo = 'deleteCompletedTodo',
  SetTodosFilter = 'setTodosFilter',
}

export type Action =
  { type: ActionTypes.AddTodo; payload: Todo }
  | { type: ActionTypes.DeleteTodo; payload: number }
  | { type: ActionTypes.ToggleStatus; payload: number }
  | { type: ActionTypes.ToggleStatusAll }
  | { type: ActionTypes.DeleteCompletedTodo }
  | { type: ActionTypes.UpdateTodo; payload: Todo; }
  | { type: ActionTypes.SetTodosFilter; payload: Status };
