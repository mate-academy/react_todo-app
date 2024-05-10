import { FILTER } from './Filter';
import { Todo } from './Todo';

export type State = {
  filterTodo: FILTER;
  todos: Todo[];
};
