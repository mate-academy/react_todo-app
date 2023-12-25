import { Actions } from '../enums';
import { Todo } from './Todo';

export type Action =
  {
    type: Actions.create | Actions.edit,
    payload: { todo: Todo }
  }
  | {
    type: Actions.remove,
    payload: { todoId: number }
  }
  | {
    type: Actions.toggleAll,
    payload: { isCompleted: boolean }
  }
  | {
    type: Actions.clearComleted,
  };
