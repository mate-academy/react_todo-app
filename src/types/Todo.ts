export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export type PatchedTodo = Partial<Pick<Todo, 'title' | 'completed'>>;
