import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const createTodo = (title: string): Todo => {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
  };
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
