import { Status } from './Status';
import { Todo } from './Todo';

export interface State {
  todos: Todo[] | [],
  filter: Status,
}
