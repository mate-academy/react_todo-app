import { ActionTypes } from './ActionTypes';

export type Actions =
  { type: ActionTypes.ADD_TODO, payload: string } |
  { type: ActionTypes.DELETE_TODO, payload: number } |
  {
    type: ActionTypes.CHANGE_TODO_TITLE,
    payloadText: string,
    payloadId: number,
  } |
  {
    type: ActionTypes.CHANGE_TODO_STATUS,
    payloadId: number,
    payloadCompleted: boolean,
  } |
  { type: ActionTypes.CHANGE_ALL_TODO_STATUS, payload: boolean } |
  { type: ActionTypes.DELETE_COMPLETED, };
