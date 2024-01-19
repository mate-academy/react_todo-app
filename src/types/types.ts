export type Todo = {
  id: number,
  title: string,
  completed: boolean,
};

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export enum ActionTypes {
  AddTodo = 'addTodo',
  RemoveTodo = 'removeTodo',
  CompleteTodo = 'completeTodo',
  CompleteAllTodo = 'completeAllTodo',
  RemoveCompletedTodo = 'removeCompletedTodo',
  EditTodo = 'editTodo',
  FilterTodo = 'filterTodo',
}

export type Action =
  { type: ActionTypes.AddTodo; payload: Todo; }
  | { type: ActionTypes.RemoveTodo; payload: number }
  | { type: ActionTypes.CompleteTodo; payload: number }
  | { type: ActionTypes.CompleteAllTodo }
  | { type: ActionTypes.RemoveCompletedTodo }
  | { type: ActionTypes.EditTodo; payload: Todo; }
  | { type: ActionTypes.FilterTodo; payload: Status; };

export interface State {
  todos: Todo[] | [],
  filter: Status,
}
