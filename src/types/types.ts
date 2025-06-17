export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum FilterParams {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
