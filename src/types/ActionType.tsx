import { Action } from "../enums/Action";
import { Todo } from "./Todo";

export type ActionType =
  | {type: Action.LOAD, payload: Todo[]}
  | { type: Action.ADD, payload: Todo }
  | { type: Action.TOGGLE_ALL }
  | { type: Action.CLEAR }
  | { type: Action, payload: number}
  | { type: Action, payload: string}
  | {type: Action.UPDATE, payload: [id: number, value: Partial<Todo>]}
