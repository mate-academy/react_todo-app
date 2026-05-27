import { FilterType } from './filters';
import { Todo } from './todo';

export type State = {
  todos: Todo[];
  filter: FilterType;
};
