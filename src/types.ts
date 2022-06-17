export interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

export enum filterValues {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}
