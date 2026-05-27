import { FilterType } from './filters';
import { Todo } from './todo';

export type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'remove'; payload: { id: number } }
  | { type: 'toggle'; payload: { id: number } }
  | { type: 'edit'; payload: { id: number; title: string } }
  | { type: 'setFilter'; payload: FilterType }
  | { type: 'clearCompleted' }
  | { type: 'toggle_all' };
