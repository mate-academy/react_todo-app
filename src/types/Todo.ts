export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

export const FILTERS = {
  all: 'all' as FilterType,
  active: 'active' as FilterType,
  completed: 'completed' as FilterType,
};
