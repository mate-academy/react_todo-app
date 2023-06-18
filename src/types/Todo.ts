export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export enum FilterType {
  ALL = 'All',
  COMPLETED = 'Completed',
  ACTIVE = 'Active',
}
