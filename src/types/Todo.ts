export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
export enum FilterStatus {
  DEFAULT = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}
