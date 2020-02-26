const FILTER = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

const filters = [
  {
    name: FILTER.ALL, href: '#/', content: 'All',
  },
  {
    name: FILTER.ACTIVE, href: '#/active', content: 'Active',
  },
  {
    name: FILTER.COMPLETED, href: '#/completed', content: 'Completed',
  },
];

export const filterUtils = {
  FILTER,
  filters,
};
