export interface Todo {
  id: number;
  userId: number | null;
  title: string;
  completed: boolean;
}

export interface TodoToSend {
  userId: number | null;
  title: string;
  completed: boolean;
}
