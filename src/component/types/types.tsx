export enum SortType {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export type TodoType = {
  title: string;
  completed: boolean;
  id: number;
};
