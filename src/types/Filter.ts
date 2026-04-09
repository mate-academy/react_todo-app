export const FILTER_ALL = 'all';
export const FILTER_ACTIVE = 'active';
export const FILTER_COMPLETED = 'completed';
export type Filter =
  | typeof FILTER_ALL
  | typeof FILTER_ACTIVE
  | typeof FILTER_COMPLETED;
