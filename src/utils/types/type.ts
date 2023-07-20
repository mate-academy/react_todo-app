export interface Todo {
  id: number,
  completed: boolean,
  title: string,
}

export interface User {
  email: string,
  password: string,
}

export type StorageData = Todo [] | User;
