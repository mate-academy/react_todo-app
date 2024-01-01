export interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

export enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export enum ReducerType {
  AddTodo = 'AddTodo',
  ToggleAll = 'ToggleAll',
  ChangeTodo = 'ChangeTodo',
  SetFilter = 'SetFilter',
  DeleteTodo = 'DeleteTodo',
  ClearCompletedTodos = 'ClearCompletedTodos',
}
