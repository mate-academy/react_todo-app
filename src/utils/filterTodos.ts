import { FilterLink } from '../types/FilterLink';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filterLink: string) => {
  switch (filterLink) {
    case FilterLink.Completed:
      return todos.filter((todo: Todo) => todo.completed);

    case FilterLink.Active:
      return todos.filter((todo: Todo) => !todo.completed);

    default:
      return todos;
  }
};
