import { Filter } from './Filter';
import { Todo } from './Todo';

export type State = {
  todos: Todo[];
  filterType: Filter;
  title: string;
};
