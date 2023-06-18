import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (todos: Todo[], currentFilter: string) => {
  let visibleTodos = todos;

  if (currentFilter !== Status.ALL) {
    visibleTodos = todos.filter(({ completed }) => {
      switch (currentFilter) {
        case Status.ACTIVE:
          return !completed;
        case Status.COMPLETED:
          return completed;
        default:
          throw new Error('Unable to filter');
      }
    });
  }

  return visibleTodos;
};
