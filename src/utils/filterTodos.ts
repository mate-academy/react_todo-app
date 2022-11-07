import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';

export const getFilteredTodos = (todosList: Todo[], todoFilter: string) => {
  return todosList.filter(todo => {
    switch (todoFilter) {
      case TodoStatus.ACTIVE:
        return !todo.completed;

      case TodoStatus.COMPLETED:
        return todo.completed;

      default:
      case TodoStatus.ALL:
        return todo;
    }
  });
};
