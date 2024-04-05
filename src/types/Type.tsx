export interface OrderItems {
  id: number;
  title: string;
  completed: boolean;
}

export enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}
