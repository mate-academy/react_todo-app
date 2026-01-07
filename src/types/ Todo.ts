export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoId = Todo['id'];
