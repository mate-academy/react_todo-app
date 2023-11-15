import { Status } from './Status';
import { TodoItem } from './TodoItem';

export enum AllActions {
  Add,
  Remove,
  Update,
  CompleteAll,
  RemoveCompleted,
  GetTasks,
}

export type Action = { type: AllActions.Add, payload: TodoItem } |
{ type: AllActions.Remove, payload: number } |
{ type: AllActions.Update, payload: number, value: TodoItem } |
{ type: AllActions.CompleteAll } |
{ type: AllActions.RemoveCompleted } |
{ type: AllActions.GetTasks, payload: Status };
