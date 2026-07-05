export const FILTERS = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
} as const;

export type Filter = (typeof FILTERS)[keyof typeof FILTERS];
