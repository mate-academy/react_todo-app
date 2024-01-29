import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  status: Status,
): Todo[] {
  return todos.filter(({ completed }) => {
    switch (status) {
      case Status.Active:
        return !completed;
      case Status.Completed:
        return completed;
      default:
        return true;
    }
  });
}
