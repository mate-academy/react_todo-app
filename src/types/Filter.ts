export enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type FilterLink = {
  type: FilterType;
  href: string;
  title: string;
  dataCy: string;
};

export const filters: FilterLink[] = [
  {
    type: FilterType.All,
    href: '#/',
    title: 'All',
    dataCy: 'FilterLinkAll',
  },
  {
    type: FilterType.Active,
    href: '#/active',
    title: 'Active',
    dataCy: 'FilterLinkActive',
  },
  {
    type: FilterType.Completed,
    href: '#/completed',
    title: 'Completed',
    dataCy: 'FilterLinkCompleted',
  },
];
