import { FilterOption } from '../types/FilterOption';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filter: FilterOption): Todo[] => {
  switch (filter) {
    case FilterOption.ACTIVE:
      return todos.filter(todo => !todo.completed);
    case FilterOption.COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
