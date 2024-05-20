import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const FilteredTodos = (todos: Todo[], filterBy: Status): Todo[] => {
  let filteredTodos = [...todos];

  if (filterBy) {
    switch (filterBy) {
      case Status.Active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case Status.Completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      case Status.All:
      default:
        break;
    }
  }

  return filteredTodos;
};
