import { Status, Todo } from '../types/types';

export function filterTodos(todos: Todo[], status: Status): Todo[] {
  switch (status) {
    case Status.ACTIVE:
      return todos.filter(todo => !todo.completed);
    case Status.COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}
