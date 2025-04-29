export enum Status {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
