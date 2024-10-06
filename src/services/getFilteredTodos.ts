import { FilterStatus } from '../types/FilterStatus';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  sortedTodos: {
    active: Todo[];
    completed: Todo[];
  },
  filterStatus: FilterStatus,
) {
  let filteredTodos = [...todos];

  if (filterStatus === FilterStatus.All) {
    return filteredTodos;
  }

  if (filterStatus === FilterStatus.Completed) {
    filteredTodos = sortedTodos.completed;
  } else {
    filteredTodos = sortedTodos.active;
  }

  return filteredTodos;
}
