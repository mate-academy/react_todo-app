export enum FilterType {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export enum SavedData {
  Todos = 'todos',
}

export const links = [
  { href: '#/', type: FilterType.All, label: 'All' },
  { href: '#/active', type: FilterType.Active, label: 'Active' },
  { href: '#/completed', type: FilterType.Completed, label: 'Completed' },
];
