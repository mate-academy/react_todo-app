import { ActionType, TodoFilterType } from './enums';
import { Todo } from './interfaces';

export type Action =
  | { type: ActionType.Add; payload: Todo }
  | { type: ActionType.OnEdit; payload: number }
  | { type: ActionType.Delete; payload: number }
  | { type: ActionType.Edit; payload: { todo: Todo; title: string } }
  | { type: ActionType.Completed; payload: Todo }
  | { type: ActionType.ClearCompleted }
  | { type: ActionType.ToggleAll }
  | { type: ActionType.CancelEdit }
  | { type: ActionType.FilterBy; payload: TodoFilterType };

export type GlobalStateProps = {
  children: React.ReactNode
};

export type DispatchFunction = (action: Action) => void;
