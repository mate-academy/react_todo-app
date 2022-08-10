export type Todo = {
  id: number
  title: string
  completed: boolean
};

export enum TodoActionType {
  delete,
  edit,
  changeStatus,
}
