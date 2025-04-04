export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoInput = Omit<Todo, 'id'>;

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export enum ErrorMessageToShow {
  Title = 'Title should not be empty',
  Add = 'Unable to add a todo',
  Delete = 'Unable to delete a todo',
  Update = 'Unable to update a todo',
  Load = 'Unable to load todos',
}
