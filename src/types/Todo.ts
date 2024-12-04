export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum Filters {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
