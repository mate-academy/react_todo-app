import { Status } from '../types/Status';

export const filterOptions = [
  { label: 'All', status: Status.All },
  { label: 'Active', status: Status.Active },
  { label: 'Completed', status: Status.Completed },
] as const;
