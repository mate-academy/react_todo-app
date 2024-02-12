import { Status } from './status';
import { Todo } from './todo';

export interface State {
  todos: Todo[],
  filterBy: Status,
}
