import { Status } from './Status';
import { Todo } from './Todo';

export type Action =
  | { type: 'add'; todo: Todo }
  | { type: 'delete'; id: number }
  | { type: 'edit'; id: number; value: string }
  | { type: 'toggleAll'; value: boolean }
  | { type: 'complete'; id: number; value: boolean }
  | { type: 'filter'; payload: Status }
  | { type: 'clearCompleted' };
