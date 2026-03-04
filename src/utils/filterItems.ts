import { SortType } from '../types/sortField';

export const filterItems = [
  { field: SortType.default, label: 'All', dataCy: 'FilterLinkAll' },
  { field: SortType.active, label: 'Active', dataCy: 'FilterLinkActive' },
  {
    field: SortType.completed,
    label: 'Completed',
    dataCy: 'FilterLinkCompleted',
  },
];
