import { FilterBy } from '../types/FilterBy';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filterBy: FilterBy) => {
  switch (filterBy) {
    case FilterBy.Active:
      return todos.filter(todo => !todo.completed);
    case FilterBy.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
