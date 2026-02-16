export const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

export type FilterType = (typeof FILTERS)[keyof typeof FILTERS];
