import { Status } from './Status';
import { Todo } from './Todo';

export interface Context {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
  filter: Status;
  setFilter: (filterBy:Status) => void;
}
