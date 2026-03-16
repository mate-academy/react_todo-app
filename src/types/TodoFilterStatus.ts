export const TODO_FILTER_STATUS = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
} as const;

export type TodoFilterStatus =
  (typeof TODO_FILTER_STATUS)[keyof typeof TODO_FILTER_STATUS];
