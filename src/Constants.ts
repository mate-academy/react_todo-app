
export const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

export type TodoFilter =
  (typeof FILTERS)[keyof typeof FILTERS];