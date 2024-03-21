import { Action } from '../enums/Action';
import { Todo } from './Todo';

export type Actions =
  | { type: Action.Create | Action.Update; payload: Todo }
  | { type: Action.UpdateAll; payload: { newStatus: boolean } }
  | { type: Action.Delete; payload: { id: number } }
  | { type: Action.DeleteCompleted };
