import { ActionTypes } from './ActionTypes';
import { Todo } from './Todo';

export type Action =
  | { type: ActionTypes.onAdd; payload: Todo }
  | { type: ActionTypes.onDelete; payload: Todo }
  | { type: ActionTypes.onUpdate; payload: Todo }
  | { type: ActionTypes.onGet };
