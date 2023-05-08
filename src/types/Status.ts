export enum Status {
  All = 'All',
  Completed = 'Completed',
  Active = 'Active',
}

export const filters = [
  {
    pathTo: '/',
    title: Status.All,
  },
  {
    pathTo: '/active',
    title: Status.Active,
  },
  {
    pathTo: '/completed',
    title: Status.Completed,
  },
];
