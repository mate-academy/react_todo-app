import { FilterOptions } from '../types/FilterOptions';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (todos: Todo[], filter: FilterOptions) => {
  switch (filter) {
    case 'Active':
      return todos.filter(todo => !todo.completed);

    case 'Completed':
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};
