export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum LinksPath {
  All = '/',
  Active = '/active',
  Completed = '/completed',
}

export type MakeChange = {
  add: (data: Todo) => void,
  remove: (id: number[]) => void,
  toggle: (items: Todo[]) => void,
};
