import { Action } from '../enums/Action';
import { ITodo } from './ITodo';

export type ActionType =
  | { type: Action.ADD_TODO; payload: ITodo['title'] }
  | { type: Action.TOGGLE_TODO; payload: ITodo['id'] }
  | { type: Action.DELETE_TODO; payload: ITodo['id'] }
  | { type: Action.CHANGE_TODO; payload: { id: ITodo['id']; newTitle: ITodo['title'] }; }
  | { type: Action.CLEAR_COMPLETED_TODOS }
  | { type: Action.COMPLETE_ALL_TODOS };
