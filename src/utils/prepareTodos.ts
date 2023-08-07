import { Todo } from '../types/Todo';
import { Filters } from '../types/enumFilter';

export const prepareTodos = (currentTodos: Todo[], field: Filters) => {
  if (field !== Filters.All) {
    return currentTodos.filter(todo => {
      switch (field) {
        case Filters.Active:
          return !todo.completed;
        case Filters.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }

  return currentTodos;
};
