import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

export function prepareTodos(todos: Todo[], filter: Filter): Todo[] {
  const todosCopy = [...todos];

  if (filter === Filter.Active) {
    return todosCopy.filter(todo => todo.completed === false);
  }

  if (filter === Filter.Completed) {
    return todosCopy.filter(todo => todo.completed === true);
  }

  return todosCopy;
}
