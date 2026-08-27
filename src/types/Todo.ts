export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterStatus = 'all' | 'active' | 'completed';
