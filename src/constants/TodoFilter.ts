import { FilterStatuses } from '../utils/enums/FilterStatuses';

export const TODO_FILTER_OPTIONS = [
  { value: FilterStatuses.All, title: 'All', href: '#/', id: 1 },
  { value: FilterStatuses.Active, title: 'Active', href: '#/active', id: 2 },
  {
    value: FilterStatuses.Completed,
    title: 'Completed',
    href: '#/completed',
    id: 3,
  },
];
