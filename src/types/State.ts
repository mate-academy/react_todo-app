import { Filters } from '../enums/TodoFilterEnum';
import { Todo } from './Todo';

export interface State {
  todos: Todo[];
  filter: Filters;
}