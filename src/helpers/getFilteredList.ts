import { FilterTypes } from '../enums/FilterTypes';
import { Todo } from '../types/Todo';

export const getFilteredList = (todos: Todo[], filterType: FilterTypes) => {
  return todos.filter(todo => {
    switch (filterType) {
      case FilterTypes.Active:
        return !todo.completed;
      case FilterTypes.Completed:
        return todo.completed;
      default:
        return true;
    }
  });
};
