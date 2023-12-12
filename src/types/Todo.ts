export interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

export enum Filter {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Comleted',
}
