import { FilterType } from '../../../types/FilterType';
import { Todo } from '../../../types/Todo';

export const filterTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  switch (filter) {
    case FilterType.Active:
      return todos.filter(({ completed }) => !completed);
    case FilterType.Completed:
      return todos.filter(({ completed }) => completed);
    default:
      return todos;
  }
};
