export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  changed: boolean;
};

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export enum SortTodos {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

