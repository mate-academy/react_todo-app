import { Filters } from '../../types';

const filterButtons = [
  {
    title: 'All',
    value: null,
  },
  {
    title: 'Active',
    value: Filters.active,
  },
  {
    title: 'Completed',
    value: Filters.completed,
  },
];

export default filterButtons;
