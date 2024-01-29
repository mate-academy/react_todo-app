import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  status: Status,
): Todo[] {
  return todos.filter(({ completed }) => {
    switch (status) {
      case Status.Completed:
        return completed;
      case Status.Active:
        return !completed;
      default:
        return true;
    }
  });
}
