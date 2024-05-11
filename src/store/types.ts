export type Todo = {
  id: number;
  completed: boolean;
  title: string;
};

export enum FilterFields {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export type TodoState = {
  todos: Todo[];
  filter: FilterFields;
};

export enum ActionTypes {
  ADD_TODO = 'ADD_TODO',
  EDIT_TODO = 'EDIT_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  SET_FILTER = 'SET_FILTER ',
}

export type Action =
  | { type: ActionTypes.ADD_TODO; payload: Todo }
  | { type: ActionTypes.EDIT_TODO; payload: { id: number; title: string } }
  | { type: ActionTypes.TOGGLE_TODO; payload: number }
  | { type: ActionTypes.DELETE_TODO; payload: number }
  | { type: ActionTypes.SET_FILTER; payload: FilterFields };
