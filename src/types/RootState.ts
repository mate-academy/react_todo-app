import { FilterOption } from './FilterOption';
import { Todo } from './Todo';

export interface RootState {
  todos: Todo[];
  filter: FilterOption;
}
