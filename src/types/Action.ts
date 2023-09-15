import { Todo } from './Todo';

export enum ActionType {
  Add = 'ADD',
  DeleteComplited = 'DELETE_COMPLETED',
  ChangeCompleted = 'CHANGE_COMPLETED',
  ChangeAllCompleted = 'CHANGE_ALL_COMPLETED',
}

type ActionChangeAllCompleted = {
  type: ActionType.ChangeAllCompleted;
};

type ActionAdd = {
  type: ActionType.Add;
  payload: Todo;
};

type ActionChangeCompleted = {
  type: ActionType.ChangeCompleted;
  payload: number;
};

type ActionDeleteCompleted = {
  type: ActionType.DeleteComplited;
};

export type Action = ActionAdd
| ActionChangeCompleted
| ActionDeleteCompleted
| ActionChangeAllCompleted;
