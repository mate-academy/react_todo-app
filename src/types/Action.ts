import { ActionTypes } from './ActionTypes';
import { Todo } from './Todo';
import { Filters } from './Filters';

export type Action =
  | { type: ActionTypes.ADD_TODOS; payload: Todo[] }
  | { type: ActionTypes.ADD_TODO; payload: Todo }
  | { type: ActionTypes.TOGGLE_TODO; payload: number }
  | { type: ActionTypes.REMOVE_TODO; payload: number }
  | { type: ActionTypes.EDIT_TODO; payload: Todo }
  | { type: ActionTypes.TOGGLE_ALL }
  | { type: ActionTypes.CLEAR_COMPLETED }
  | { type: ActionTypes.SET_FILTER; payload: Filters }
  | { type: ActionTypes.SELECT_TODO; payload: number | null };
