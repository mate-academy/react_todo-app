import { Filter } from './Filter';
import { Todo } from './Todo';

export type State = {
  todos: Todo[];
  filterBy: Filter;
  todosCounter: number;
  toggleAll: boolean;
  isCompleted: boolean;
};
