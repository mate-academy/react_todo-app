import { Todo } from './Todo';

export enum ActionType {
  AddTodo = 'ADD_TODO',
  DeleteTodo = 'DELETE_TODO',
  DeleteComplited = 'DELETE_COMPLETED',
  ChangeCompleted = 'CHANGE_COMPLETED',
  ChangeAllCompleted = 'CHANGE_ALL_COMPLETED',
}

type ActionDeleteTodo = {
  type: ActionType.DeleteTodo;
  payload: number;
};

type ActionChangeAllCompleted = {
  type: ActionType.ChangeAllCompleted;
};

type ActionAddTodo = {
  type: ActionType.AddTodo;
  payload: Todo;
};

type ActionChangeCompleted = {
  type: ActionType.ChangeCompleted;
  payload: number;
};

type ActionDeleteCompleted = {
  type: ActionType.DeleteComplited;
};

export type Action = ActionAddTodo
| ActionChangeCompleted
| ActionDeleteCompleted
| ActionChangeAllCompleted
| ActionDeleteTodo;
