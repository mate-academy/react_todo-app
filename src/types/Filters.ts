export enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}
export type Filters = Status.All | Status.Active | Status.Completed;

export type Filter = {
  href: string,
  title: Filters,
};
