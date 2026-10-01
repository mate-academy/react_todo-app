import { FilterType } from './FilterType';
import { Todo } from './Todo';

export type StateContextType = {
  todos: Todo[];
  filter: FilterType;
  focusHeader: boolean;
};
