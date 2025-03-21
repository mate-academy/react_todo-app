export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterType = 'All' | 'Active' | 'Completed';
