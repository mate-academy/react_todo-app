export interface OrderItems {
  id: number;
  title: string;
  completed: boolean;
  editing?: boolean;
}

export enum Status {
  ALL = 'ALL',
  COMLETED = 'COMLETED',
  ACTIVE = 'ACTIVE',
}
