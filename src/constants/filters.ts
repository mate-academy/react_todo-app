import { FilterBy } from '../types/FilterBy';

export const filters = [
  { label: 'All', value: FilterBy.All, cy: 'FilterLinkAll', href: '#/' },
  {
    label: 'Active',
    value: FilterBy.Active,
    cy: 'FilterLinkActive',
    href: '#/active',
  },
  {
    label: 'Completed',
    value: FilterBy.Completed,
    cy: 'FilterLinkCompleted',
    href: '#/completed',
  },
];
