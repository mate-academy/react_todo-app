export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export enum Filter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const filteredOptions = [
  {
    href: '#/',
    title: Filter.All,
    'data-cy': 'FilterLinkAll',
  },
  {
    href: '#/active',
    title: Filter.Active,
    'data-cy': 'FilterLinkActive',
  },
  {
    href: '#/completed',
    title: Filter.Completed,
    'data-cy': 'FilterLinkCompleted',
  },
];
