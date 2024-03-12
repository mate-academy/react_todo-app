export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface State {
  todos: Todo[];
  filterBy: Filter;
}
