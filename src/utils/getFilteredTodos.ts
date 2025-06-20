import { Todo } from '../types/todo/Todo';
import { StatusFilter } from '../enums/statusFilter';

export function getFilteredTodos(todos: Todo[], statusFilter: StatusFilter) {
  const filteredTodos = [...todos];

  switch (statusFilter) {
    case StatusFilter.Active:
      return filteredTodos.filter(todo => !todo.completed);
    case StatusFilter.Completed:
      return filteredTodos.filter(todo => todo.completed);
    case StatusFilter.All:
    default:
      return filteredTodos;
  }
}
