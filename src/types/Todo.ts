export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  isLoading?: boolean;
}
