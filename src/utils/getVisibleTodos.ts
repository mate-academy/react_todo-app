import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (path: string, allTodos: Todo[]) => {
  switch (path) {
    case FilterType.Active:
      return allTodos.filter(todo => !todo.completed);

    case FilterType.Completed:
      return allTodos.filter(todo => todo.completed);

    default:
      return allTodos;
  }
};
