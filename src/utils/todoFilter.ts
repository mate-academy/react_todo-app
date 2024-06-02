import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const todoFilter = (todos: Todo[], status: Status) => {
  switch (status) {
    case Status.All:
      return todos;
    case Status.Active:
      return todos.filter(todo => !todo.completed);
    case Status.Completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};
