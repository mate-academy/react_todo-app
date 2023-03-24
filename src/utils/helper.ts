import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const createTodo = (title: string): Todo => {
  return {
    id: +new Date(),
    title,
    completed: false,
  };
};

export const getLinkText = (link: string) => {
  switch (link) {
    case Status.All:
      return 'All';

    case Status.Active:
      return 'Active';

    case Status.Completed:
      return 'Completed';

    default:
      return 'All';
  }
};

export const filterByStatus = (filter: string, todos: Todo[]) => {
  switch (filter) {
    case Status.Active:
      return todos.filter(({ completed }) => !completed);

    case Status.Completed:
      return todos.filter(({ completed }) => completed);

    default:
      return todos;
  }
};
