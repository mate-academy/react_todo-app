const FILTER = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

const filters = [
  {
    name: FILTER.ALL, href: '#/', label: 'All',
  },
  {
    name: FILTER.ACTIVE, href: '#/active', label: 'Active',
  },
  {
    name: FILTER.COMPLETED, href: '#/completed', label: 'Completed',
  },
];

export const filterUtils = {
  FILTER,
  filters,
};
