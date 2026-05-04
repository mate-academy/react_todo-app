export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterOptions = 'all' | 'active' | 'completed';
