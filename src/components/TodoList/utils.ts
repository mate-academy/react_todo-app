import { FilterType, Todo } from '../../types/globalTypes';

export function getFiltredTodos(todos: Todo[], filterType: FilterType) {
  switch (filterType) {
    case 'Active':
      return todos.filter(todo => !todo.completed);
    case 'Completed':
      return todos.filter(todo => todo.completed);
    default:
      return [...todos];
  }
}
