import { FilterBy } from './FilterBy';
import { Todo } from './Todo';

export interface VisibleTodos {
  todos: Todo[];
  filter: FilterBy;
}
