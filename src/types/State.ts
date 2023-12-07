import { Todo, TodosFilter } from './Todo';

export interface State {
  todos: Todo[],
  filterBy: TodosFilter,
}
