import { TodoStatus, Todo } from '../types';

export function getFilteredTodos(
  category: TodoStatus,
  todoItems: Todo[],
) {
  if (category !== TodoStatus.All) {
    return todoItems
      .filter(({ completed }) => {
        switch (category) {
          case TodoStatus.Active:
            return !completed;
          case TodoStatus.Completed:
            return completed;
          default:
            return true;
        }
      });
  }

  return todoItems;
}
