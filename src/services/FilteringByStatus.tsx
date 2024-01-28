import { Status } from '../types/Status';
import { Todos } from '../types/Todos';

export const filterTodoByStatus = (todoItems: Todos[], values: Status) => {
  const copy = [...todoItems];

  switch (values) {
    case Status.Active:
      return copy.filter((todo: Todos) => todo.completed !== true);
    case Status.Completed:
      return copy.filter((todo: Todos) => todo.completed === true);
    default:
      return todoItems;
  }
};
