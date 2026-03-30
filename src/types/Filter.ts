export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const filterLinks = [
  {
    value: Filter.All,
    href: '#/',
    label: 'All',
    dataCy: 'FilterLinkAll',
  },
  {
    value: Filter.Active,
    href: '#/active',
    label: 'Active',
    dataCy: 'FilterLinkActive',
  },
  {
    value: Filter.Completed,
    href: '#/completed',
    label: 'Completed',
    dataCy: 'FilterLinkCompleted',
  },
] as const;
