import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todosList: Todo[],
  status: string,
): Todo[] => {
  return todosList.filter(todo => {
    switch (status) {
      case Status.ACTIVE:
        return !todo.completed;

      case Status.COMPLETED:
        return todo.completed;

      default:
      case Status.ALL:

        return todo;
    }
  });
};
