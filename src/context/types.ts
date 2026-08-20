export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum TodoFilterEnum {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const FILTERS = Object.values(TodoFilterEnum) as TodoFilterEnum[];
export type Filter = `${TodoFilterEnum}`;

export interface State {
  todos: Todo[];
  activeFilter: Filter;
}

export type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'delete'; payload: number }
  | { type: 'updateTitle'; payload: { id: number; title: string } }
  | { type: 'toggle'; payload: number }
  | { type: 'toggleAll' }
  | { type: 'clearCompleted' }
  | { type: 'setFilter'; payload: Filter };
