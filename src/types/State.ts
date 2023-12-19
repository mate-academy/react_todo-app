import { Todo } from './Todo';
import { FilterOption } from './FilterOption';

export interface State {
  todos: Todo[] | [],
  currentFilter: FilterOption,
}
