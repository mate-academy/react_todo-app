export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface NewTodo {
  userId: number;
  title: string;
  completed: boolean;
}
