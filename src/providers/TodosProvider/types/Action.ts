import { Todo } from '../../../types/Todo';
import { ActionType } from '../../../types/ActionType';

export type Action =
  | { type: ActionType.AddTodo; payload: Todo }
  | { type: ActionType.DeleteTodo; payload: number }
  | { type: ActionType.ChangeStatus; payload: number }
  | { type: ActionType.ChangeName; payload: Omit<Todo, 'completed'> }
  | { type: ActionType.LeadToOneStatus; payload: boolean }
  | { type: ActionType.ClearCompleted };
