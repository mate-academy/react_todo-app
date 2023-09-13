export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
}

export enum Filter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export enum TodoStyle {
  View = 'view',
  Completed = 'completed',
  Editing = 'editing',
}
