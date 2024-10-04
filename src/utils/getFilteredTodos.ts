import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';

export function getFilteredTodos(todos: Todo[], filter: Filters) {
  switch (filter) {
    case Filters.completed:
      return todos.filter(todo => todo.completed === true);

    case Filters.active:
      return todos.filter(todo => todo.completed === false);
  }

  return todos;
}
