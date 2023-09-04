import { Status } from './types/filterENUM';

export const linkOptions = [
  { path: '#/', filterValue: Status.ALL, label: 'All' },
  { path: '#/active', filterValue: Status.ACTIVE, label: 'Active' },
  { path: '#/completed', filterValue: Status.COMPLETED, label: 'Completed' },
];
