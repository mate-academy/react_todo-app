import { Filter } from './services/enums';

export const filters = [
  { path: '#/', filter: Filter.ALL, value: 'All' },
  { path: '#/active', filter: Filter.ACTIVE, value: 'Active' },
  { path: '#/completed', filter: Filter.COMPLETED, value: 'Completed' },
];
