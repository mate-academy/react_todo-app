import { Filter } from './Filter';
import { Todo } from './Todo';

export type State = {
  todos: Todo[];
  filter: Filter;
};
