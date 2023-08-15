export enum FilterValues {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export const filters = [
  {
    link: '/',
    name: FilterValues.ALL,
  },
  {
    link: '/active',
    name: FilterValues.ACTIVE,
  },
  {
    link: '/completed',
    name: FilterValues.COMPLETED,
  },
];
