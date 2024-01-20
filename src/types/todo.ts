export interface Todo {
  id: number;
  completed: boolean;
  title: string;
}

export enum Status {
  all = 'All',
  completed = 'Completed',
  active = 'Active',
}
