import { Todo, Status } from '../types/todo';

export function filterTodos(filter: Status, todos: Todo[]) {
  switch (filter) {
    case Status.Active:
      return todos.filter(todo => !todo.completed);

    case Status.Completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}
