import { Todo } from '../types/Todo';
import { FilterOption } from '../types/FilterOption';

export const filterTodos = (todos: Todo[], filter: FilterOption) => {
  switch (filter) {
    case FilterOption.COMPLETED:
      return todos.filter(todo => todo.completed);

    case FilterOption.ACTIVE:
      return todos.filter(todo => !todo.completed);

    default:
      return todos;
  }
};
