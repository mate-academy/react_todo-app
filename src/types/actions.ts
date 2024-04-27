import { Filter, Todo } from './state';

export enum Action {
  addTodo = 'addTodo',
  updateTodo = 'updateTodo',
  deleteTodo = 'deleteTodo',
  changeFiilter = 'changeFiilter',
  cleareCompleted = 'cleareCompleted',
}

type UpdateTodo = { id: number; changes: boolean | string };

export type Actions =
  | { type: Action.addTodo; payload: Todo }
  | { type: Action.updateTodo; payload: UpdateTodo }
  | { type: Action.deleteTodo; payload: number }
  | { type: Action.changeFiilter; payload: Filter }
  | { type: Action.cleareCompleted };
