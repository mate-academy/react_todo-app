export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
