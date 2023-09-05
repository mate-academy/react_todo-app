import { Status } from '../types/Status';

export const linkOptions = [
  { path: '#/', filterValue: Status.All, label: 'All' },
  { path: '#/active', filterValue: Status.Active, label: 'Active' },
  { path: '#/completed', filterValue: Status.Completed, label: 'Completed' },
];
