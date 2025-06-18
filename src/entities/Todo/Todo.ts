export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type Filter = 'all' | 'active' | 'completed';
export type FilterLabels = 'All' | 'Active' | 'Completed';
