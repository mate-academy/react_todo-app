import { ActionType } from './ActionType';
import { TodoType } from './TodoType';

export type Action =
  | { type: ActionType.Delete; payload: number }
  | { type: ActionType.SetCompleted; payload: number }
  | { type: ActionType.Add; payload: TodoType }
  | { type: ActionType.ClearCompleted }
  | { type: ActionType.SetCompletedAll }
  | { type: ActionType.SetFilterActive }
  | { type: ActionType.SetFilterCompleted }
  | { type: ActionType.SetFilterAll }
  | { type: ActionType.EditTitle; payload: { id: number; title: string } };
