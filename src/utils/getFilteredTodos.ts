import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], action: Status): Todo[] => {
  switch (action) {
    case Status.ALL:
      return todos;

    case Status.ACTIVE:
      return todos.filter(todo => !todo.completed);

    case Status.COMPLETED:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};
