import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const visiableTodos = (todos: Todo[], query = Status.all) => {
  return todos.filter(todo => {
    switch (query) {
      case Status.completed:
        return todo.completed;

      case Status.active:
        return !todo.completed;

      case Status.all:
        return todo;
    }
  });
};
