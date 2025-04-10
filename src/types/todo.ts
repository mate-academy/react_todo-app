export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const FILTERS = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

export type FilterType = keyof typeof FILTERS;
