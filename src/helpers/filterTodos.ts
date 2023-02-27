import { Todo } from '../types/Todo';

import { FilterType } from '../enums/FilterType';

export function filterTodos(
  todos: Todo[],
  selectedFilter: FilterType,
): Todo[] {
  if (selectedFilter === FilterType.All) {
    return todos;
  }

  return todos.filter((todo) => {
    switch (selectedFilter) {
      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;

      default:
        return true;
    }
  });
}
