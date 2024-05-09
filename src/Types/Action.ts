import { Status } from './Status';
import { Todo } from './Todo';

export type Action =
  | { type: 'add-todo'; payload: Todo }
  | { type: 'toggle-completed'; payload: number }
  | { type: Status.All }
  | { type: Status.Active }
  | { type: Status.Completed }
  | { type: 'delete'; payload: number }
  | { type: 'clear-completed' }
  | { type: 'toggle-all' };
