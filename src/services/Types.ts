export enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export type Todo = {
  id: number,
  title: string,
  completed: boolean,
};

export type State = {
  todos: Todo[],
  visible: Status,
};

export type Action
  = { type: 'edit', payload: { id: number, newTitle: string } }
  | { type: 'remove', payload: { id: number } }
  | { type: 'clearCompleted', payload?: {} }
  | { type: 'add', payload: { todo: Todo } }
  | { type: 'toogleAll', payload?: {} }
  | { type: 'All', payload: { status: string } }
  | { type: 'Active', payload: { status: string } }
  | { type: 'Completed', payload: { status: string } }
  | { type: 'markCompleted', payload: { id: number } };
