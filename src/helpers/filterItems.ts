import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterItems = (items: Todo[], filterBy: Status) => {
  switch (filterBy) {
    case Status.Active:
      return items.filter(i => !i.completed);

    case Status.Completed:
      return items.filter(i => i.completed);

    default:
      return items;
  }
};
