import { Todo } from './Todo';
import { Filter } from './Filter';

export type State = {
  todos: Todo[];
  filter: Filter;
};
