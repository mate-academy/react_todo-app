import { FilteredBy, Todo } from '../types/todo';

export function getFilteredTodos(todos: Todo[], filteredBy:FilteredBy): Todo[] {
  switch (filteredBy) {
    case FilteredBy.COMPLETED:
      return todos.filter(todo => todo.completed);

    case FilteredBy.ACTIVE:
      return todos.filter(todo => !todo.completed);

    default:
      return todos;
  }
}
