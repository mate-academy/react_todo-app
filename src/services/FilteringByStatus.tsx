import { FilterStatus } from '../types/Status';
import { Todos } from '../types/Todos';

export const filterTodoByStatus = (todoItems: Todos[], values: FilterStatus) => {

  switch (values) {
    case FilterStatus.Active:
      return todoItems.filter((todo: Todos) => !todo.completed);
    case FilterStatus.Completed:
      return todoItems.filter((todo: Todos) => todo.completed);
    default:
      return todoItems;
  }
};
