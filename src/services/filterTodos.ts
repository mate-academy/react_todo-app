import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filteredTodos = (
  todoItems: Todo[],
  filterValues: Status,
): Todo[] => {
  return todoItems.filter((todo: Todo) => {
    switch (filterValues) {
      case Status.active:
        return !todo.completed;

      case Status.completed:
        return todo.completed;

      default:
        return true;
    }
  });
};
