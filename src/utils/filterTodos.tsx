import { Status } from '../Types/Status';
import { Todo } from '../Types/Todo';

export function filterTodos(filter: Status, todos: Todo[]) {
  switch (filter) {
    case Status.ACTIVE:
      return todos.filter(todo => !todo.completed);

    case Status.COMPLETED:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}
