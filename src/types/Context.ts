import { Status } from './Status';
import { Todo } from './Todo';

export type Context = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
  visibleTodos: () => Todo[];
  filter: Status;
  setFilter: (v: Status) => void;
  checked: boolean;
  setChecked: (v: boolean) => void;
};
