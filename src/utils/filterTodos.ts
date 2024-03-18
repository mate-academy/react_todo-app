import { FilterStatus } from '../components/TodosFilter';
import { Todo } from '../types';

export function filterTodos(todos: Todo[], filterStatus: FilterStatus) {
  return todos.filter(value => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return value.completed === false;
      case FilterStatus.Completed:
        return value.completed === true;
      case FilterStatus.All:
      default:
        return true;
    }
  });
}
