export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoChanges = Partial<Pick<Todo, 'title' | 'completed'>>;
