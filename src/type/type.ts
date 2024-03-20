export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum Filter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export interface State {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}
