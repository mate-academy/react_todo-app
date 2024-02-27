export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum Status {
  All = '#/',
  Active = '#/active',
  Completed = '#/completed',
}
