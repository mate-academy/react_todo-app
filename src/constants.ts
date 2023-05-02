export enum Status {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export const filters = [
  {
    link: '/',
    name: Status.ALL,
  },
  {
    link: '/active',
    name: Status.ACTIVE,
  },
  {
    link: '/completed',
    name: Status.COMPLETED,
  },
];
