import { Status } from '../interface/Status';
import { Todo } from '../interface/Todo';

export const getFilteredTodos = (todos: Todo[], selectedFilter: Status) => {
  const todosCopy = [...todos];

  if (selectedFilter) {
    switch (selectedFilter) {
      case Status.Active:
        return todosCopy.filter(({ completed }) => !completed);
      case Status.Completed:
        return todosCopy.filter(({ completed }) => completed);
      default:
        return todos;
    }
  }

  return todosCopy;
};
