export type Todo = {
  completed: boolean;
  title: string;
  id: number;
};



export enum FilterType {
  All = 'ALL',
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
}


