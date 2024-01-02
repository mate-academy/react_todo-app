export type Todo = {
  id:number
  value:string
  completed:boolean
};

export enum ActionType {
  add = 'ADD',
  toggleAll = 'TOGGLEALL',
  toggleOne = 'TOGGLEONE',
  delete = 'DELETE',
  clearcompleted = 'CLEARCOMPLETE',
  update = 'UPDATE',
}

export type Action = { type: ActionType.add, payload: string }
| { type: ActionType.toggleAll, payload: boolean }
| { type: ActionType.toggleOne, payload: number }
| { type: ActionType.delete, payload:number }
| { type: ActionType.clearcompleted }
| { type: ActionType.update, payload:{ updateValue:string,
  id:number } };
