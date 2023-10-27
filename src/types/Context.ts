import { Option } from './Option';
import { Todo } from './Todo';

export interface Context {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
  filter: Option;
  setFilter: (v: Option) => void;
  visibleTodos: Todo[];
  isToggleCheckedAll: boolean;
  setIsToggleCheckedAll: (v: boolean) => void;
}
