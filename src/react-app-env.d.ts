/// <reference types="react-scripts" />

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

export interface State {
  todos: Todo[],
  filterBy: FilterBy,
}
