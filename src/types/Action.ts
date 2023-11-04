import { Status } from './Status';
import { TodoItemType } from './TodoItemType';

export enum AllActions {
  Add,
  Remove,
  Update,
  CompleteAll,
  RemoveCompleted,
  GetTasks,
}

export type Action = { type: AllActions.Add, payload: TodoItemType } |
{ type: AllActions.Remove, payload: number } |
{ type: AllActions.Update, payload: number, value: TodoItemType } |
{ type: AllActions.CompleteAll } |
{ type: AllActions.RemoveCompleted } |
{ type: AllActions.GetTasks, payload: Status };
