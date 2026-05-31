export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export enum FilterType {
  All = 'All',
  Completed = 'Completed',
  Active = 'Active',
}
