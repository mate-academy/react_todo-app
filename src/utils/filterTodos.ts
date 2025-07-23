import { FilterType } from '../constants/FilterType';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filter: FilterType) =>
  todos.filter(todo => {
    switch (filter) {
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      case FilterType.All:
      default:
        return true;
    }
  });
