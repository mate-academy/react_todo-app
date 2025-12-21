export const FILTERS = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
} as const;

export type FilterType = (typeof FILTERS)[keyof typeof FILTERS];
