import { Status } from '../types/Status';
import { FilterOption } from '../types/FilterOption';

export const filterOptions: FilterOption[] = [
  {
    hash: Status.All,
    title: 'All',
    callback: (() => true),
  },
  {
    hash: Status.Active,
    title: 'Active',
    callback: (({ completed }) => !completed),
  },
  {
    hash: Status.Completed,
    title: 'Completed',
    callback: (({ completed }) => completed),
  },
];
