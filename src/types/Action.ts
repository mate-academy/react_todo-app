import { Status } from './Status';
import { Todo } from './Todo';

export type Action =
  | { type: 'todos'; payload: Todo[] }
  | { type: 'filter'; payload: Status };
