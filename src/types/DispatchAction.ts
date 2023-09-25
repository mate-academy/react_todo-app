import { Action } from './Action';

type AddTodo = {
  type: Action.Add,
  payload: string,
};

type RemoveTodo = {
  type: Action.Remove,
  payload: number,
};

type EditTodo = {
  type: Action.Edit,
  payload: { id: number, title: string },
};

type ToggleTodo = {
  type: Action.Toggle,
  payload: number,
};

type ToggleAllTodos = {
  type: Action.ToggleAll,
};

type ClearCompletedTodos = {
  type: Action.ClearCompleted,
};

export type DispatchAction = AddTodo
| RemoveTodo
| EditTodo
| ToggleTodo
| ToggleAllTodos
| ClearCompletedTodos;
