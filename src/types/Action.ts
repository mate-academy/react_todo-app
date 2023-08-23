import { Todo } from './Todo';

export enum ActionTypes {
  ADD_TODO,
  REMOVE_TODO,
  CHANGE_STATUS,
  TOGGLE_ALL,
  REMOVE_ALL_COMPLETED,
  EDIT_TODO,
}

export type Action =
  | { type: ActionTypes.ADD_TODO, payload: Todo }
  | { type: ActionTypes.REMOVE_TODO, payload: number }
  | { type: ActionTypes.CHANGE_STATUS, payload: number }
  | { type: ActionTypes.TOGGLE_ALL }
  | { type: ActionTypes.REMOVE_ALL_COMPLETED }
  | { type: ActionTypes.EDIT_TODO, payload: { id: number, newTitle: string } };
