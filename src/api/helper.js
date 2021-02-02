import { FILTERS } from './constant';

export const getFilteringTodos = (filters, todos) => {
  switch (filters) {
    case FILTERS.all:
      return todos;
    case FILTERS.active:
      return todos.filter(todo => todo.completed === false);
    case FILTERS.completed:
      return todos.filter(todo => todo.completed === true);
    default:
      return todos;
  }
};
