import { FILTER } from './Filter';
import { Todo } from './Todo';

type UpdatedPayload = {
  id: number;
  updated: boolean | string;
};

type ChangePayload = {
  id: number;
  editedTitle: string;
};

export enum Action {
  saveTodo = 'save',
  updateTodo = 'update',
  changeTodo = 'change',
  clearTodo = 'clear',
  filterTodo = 'filter',
  clearAllTodo = 'clearAll',
}

export type Actions =
  | { type: Action.saveTodo; payload: Todo }
  | { type: Action.updateTodo; payload?: UpdatedPayload }
  | { type: Action.changeTodo; payload: ChangePayload }
  | { type: Action.clearTodo; payload: number }
  | { type: Action.filterTodo; payload: FILTER };
