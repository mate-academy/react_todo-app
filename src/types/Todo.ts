export interface Todo {
  id: number,
  title: string,
  completed: false,
}

export enum TodosFilter {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Comleted',
}
