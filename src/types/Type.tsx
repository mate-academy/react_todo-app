export interface OrderItems {
  id: number;
  title: string;
  completed: boolean;
  // editing?: boolean;
}

export enum Status {
  All = 'All',
  Completed = 'Completed',
  Active = 'Active',
}
