import { Filter } from '../type/Filter';
import { Todo } from '../type/Todo';

export const fiteredTodos = (todos: Todo[], filter: Filter) => {
  return todos.filter(todo => {
    switch (filter) {
      case Filter.Completed:
        return todo.completed;

      case Filter.Active:
        return !todo.completed;

      default:
        return todo;
    }
  });
};
