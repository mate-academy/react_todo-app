import { Todo, Filter } from './Todo';

export interface State {
  todos: Todo[],
  filterBy: Filter,
}
