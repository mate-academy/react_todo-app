import { Status } from './Status';
import { Todo } from './Todo';

export type TodosContextType = {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
  visibleTodos: () => Todo[];
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  filter: Status;
  setFilter: (value: Status) => void;
};
