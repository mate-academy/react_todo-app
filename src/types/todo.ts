export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum FilteredBy {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}
