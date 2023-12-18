import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTasks = (todos: Todo[], filter: Status): Todo[] => {
  switch (filter) {
    case Status.All:
      return todos;
    case Status.Active:
      return todos.filter((todo) => todo.completed === false);
    case Status.Completed:
      return todos.filter((todo) => todo.completed === true);
    default:
      return todos;
  }
};
