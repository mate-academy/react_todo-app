import { Status } from '../../../libs/enums';
import { Filter } from '../../../libs/types';

export const filters: Filter[] = [
  {
    title: 'All',
    hash: Status.all,
  },
  {
    title: 'Active',
    hash: Status.active,
  },
  {
    title: 'Completed',
    hash: Status.completed,
  },
];
