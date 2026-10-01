import { FilterType } from './FilterType';
import { Todo } from './Todo';

export type State = {
  todos: Todo[];
  filter: FilterType;
  focusHeader: boolean;
};
