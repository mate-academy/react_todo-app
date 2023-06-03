import { LinkPath } from '../types/LinksPath';
import { Todo } from '../types/Todo';

export const filterTodos = (
  items: Todo[],
  filterBy: string,
) => {
  if (filterBy === LinkPath.ALL) {
    return items;
  }

  return items.filter(({ completed }) => {
    switch (filterBy) {
      case LinkPath.ACTIVE:
        return completed === false;

      case LinkPath.COMPLETED:
        return completed === true;

      default:
        return false;
    }
  });
};
