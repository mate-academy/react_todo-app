import { Todo } from '../types/Todo';
import { FilterOptions } from '../types/FilterOptions';

export const filteringTodos = (todos: Todo[], filterOption: FilterOptions) => {
  return todos.filter(({ completed }) => {
    switch (filterOption) {
      case FilterOptions.Completed:
        return completed;

      case FilterOptions.Active:
        return !completed;

      default:
        return true;
    }
  });
};
