export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface PatchedTodo {
  completed?: boolean;
  title?: string;
}
