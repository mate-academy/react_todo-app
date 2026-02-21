export const Filters = ["all", "active", "completed"] as const;
export type Filter = typeof Filters[number];
