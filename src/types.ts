export type Todo = {
  id: number,
  title: string,
  completed: boolean,
};

export enum Status {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export enum Key {
  ENTER = 'Enter',
  ESC = 'Escape',
}
