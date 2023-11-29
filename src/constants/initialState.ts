import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const initialState = {
  todos: [] as Todo[],
  filteredBy: Status.All,
};
