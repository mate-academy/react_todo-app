export enum FilterBy {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
