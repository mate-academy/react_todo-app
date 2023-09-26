export type TaskType = {
  id: number,
  title: string;
  completed: boolean;
};

export enum Status {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}
