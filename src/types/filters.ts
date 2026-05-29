import { StatusType } from './Status';

export const filters = [
  {
    label: 'All',
    href: '#/',
    status: StatusType.All,
  },
  {
    label: 'Active',
    href: '#/active',
    status: StatusType.Active,
  },
  {
    label: 'Completed',
    href: '#/completed',
    status: StatusType.Completed,
  },
];
