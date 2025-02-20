import { FilterType } from './FilterType';
import { Todo } from './Todo';

export interface State {
  todos: Todo[];
  filter: FilterType;
}
