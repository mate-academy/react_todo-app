export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum StatusFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
