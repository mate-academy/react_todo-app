import { Action } from './Action';
import { Todo } from './Todo';

export type TodoConstextType = {
  todos: Todo[],
  dispatch: (action: Action) => void
};
