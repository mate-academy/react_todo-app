import { Filtering, Todo } from '../CustomReducer/useCustomReducer';

export interface Values {
  state: Todo[] | [];
  filterItems: (filterType: Filtering) => Todo[];
  addTodo: (todo: Todo) => void;
  addCompleted: (id: number) => void;
  remove: (id: number) => void;
}
