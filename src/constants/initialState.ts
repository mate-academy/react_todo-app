import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const initialState = {
  todos: [] as Todo[],
  toggleAll: false,
  filteredBy: Status.All,
  editingTodo: 0,
};
