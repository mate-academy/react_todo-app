export const FILTER = {
  all: 'all',
  active: 'active',
  completed: 'completed',
} as const;

export type FilterType = (typeof FILTER)[keyof typeof FILTER];
