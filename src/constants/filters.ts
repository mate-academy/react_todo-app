export const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
} as const;

export type FilterType = (typeof FILTERS)[keyof typeof FILTERS];
