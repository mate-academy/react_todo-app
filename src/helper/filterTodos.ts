import { LinksPath } from '../types/LinksPath';
import { Todo } from '../types/Todo';

export const filterTodos = (items: Todo[], filterBy: string) => {
  if (filterBy === LinksPath.All) {
    return items;
  }

  return items.filter(({ completed }) => {
    switch (filterBy) {
      case LinksPath.Active:
        return !completed;

      case LinksPath.Completed:
        return completed;

      default:
        return items;
    }
  });
};
