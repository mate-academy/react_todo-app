import { Action } from '../enums/Action';

export type ActionType =
  | { type: Action.addNewTodo }
  | { type: Action.updateNewTodoName; newInputName: string }
  | { type: Action.changeIsCompleted; index: number }
  | { type: Action.removeTodo; index: number }
  | { type: Action.editName; newName: string; index: number }
  | { type: Action.toggleCompleted }
  | { type: Action.clearAllCompleted };
