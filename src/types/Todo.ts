export interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

export enum FilterType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLITED = 'completed',
}

export interface State {
  todos: Todo[],
  filterBy: FilterType,
}
