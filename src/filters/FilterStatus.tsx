import { Status } from '../types/StatusEnum';

export const statusLinks = [
  { path: '#/', filterValue: Status.All, label: 'All' },
  { path: '#/active', filterValue: Status.Active, label: 'Active' },
  { path: '#/completed', filterValue: Status.Completed, label: 'Completed' },
];
