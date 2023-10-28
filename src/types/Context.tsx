import { Todo } from './Todo';

export interface State {
  todos: Todo[];
  filter: Filter;
  onSave?: (v: Todo[]) => void;
}

export type Action =
  | { type: 'ADD_TASK', payload: string }
  | { type: 'REMOVE_TASK', payload: number }
  | { type: 'TOGGLE_TODO', payload: number }
  | { type: 'TOGGLE_ALL', payload: boolean }
  | { type: 'CHANGE_FILTER', payload: Filter }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'CHANGE_TODO', payload: Todo };

export type Filter = 'ALL' | 'COMPLETED' | 'ACTIVE';
