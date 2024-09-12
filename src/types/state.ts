export enum Filter {
  all = 'all',
  completed = 'completed',
  active = 'active',
}

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type State = {
  filter: Filter;
  todos: Todo[];
};
