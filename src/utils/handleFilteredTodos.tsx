import { Filters, Todo } from '../types';

export const handleFilteredTodos = (todos: Todo[], filter: Filters) => {
  const filteredTodos = [...todos];

  switch (filter) {
    case Filters.Active:
      return filteredTodos.filter(todo => !todo.completed);

    case Filters.Completed:
      return filteredTodos.filter(todo => todo.completed);

    case Filters.All:
    default:
      return filteredTodos;
  }
};
