import { FilterTypes } from './FilterTypes';
import { TodoType } from './TodoType';

export type State = {
  filter: FilterTypes,
  todos: TodoType[],
};
