export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum TodoStatus {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodoStatusRoutes: Record<TodoStatus, string> = {
  [TodoStatus.All]: '/',
  [TodoStatus.Active]: '/active',
  [TodoStatus.Completed]: '/completed',
};
