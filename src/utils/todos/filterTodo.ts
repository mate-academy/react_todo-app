import { Todo } from '../../types/Todo';
import { FilterStatuses } from '../enums/FilterStatuses';

export const getFiltredTodo = (todos: Todo[], status: FilterStatuses) =>
  todos.filter(({ completed }) => {
    switch (status) {
      case FilterStatuses.Active:
        return !completed;
      case FilterStatuses.Completed:
        return completed;
      default:
        return true;
    }
  });
