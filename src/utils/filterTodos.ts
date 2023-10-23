import { Todo } from '../types/todo';
import { Status } from './Status';

export function filterTodos(todos: Todo[], filterParam: Status) {
  return todos.filter(todo => {
    switch (filterParam) {
      case (Status.All):
        return todo;
      case (Status.Active):
        return !todo.completed;
      case (Status.Completed):
        return todo.completed;
      default:
        return todo;
    }
  });
}
