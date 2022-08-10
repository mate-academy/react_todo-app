export interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

export enum Status {
  ALL = '/',
  ACTIVE = '/active',
  COMPLETED = '/completed',
}
