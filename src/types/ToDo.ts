export interface ToDo {
  id: number,
  title: string,
  completed: boolean,
}

export enum ToDoEnum {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}
