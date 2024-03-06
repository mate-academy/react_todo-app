import { Status } from './Status';
import { Todo } from './Todo';

export interface State {
  status: Status;
  todos: Todo[];
}
