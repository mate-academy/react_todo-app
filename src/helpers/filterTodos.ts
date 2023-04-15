import { LinksPath } from '../types/LinksPath';
import { Todo } from '../types/Todo';

export const filterTodos = (items: Todo[], filterBy: string) => {
  switch (filterBy) {
    case LinksPath.ACTIVE:
      return items.filter(({ completed }) => completed === false);

    case LinksPath.COMPLETED:
      return items.filter(({ completed }) => completed === true);

    default:
      return items;
  }
};
