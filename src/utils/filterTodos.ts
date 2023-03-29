import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

export const filterTodos = (
  todos: Todo[],
  filterParam: Filter,
) => {
  const visibleTodos = [...todos];

  switch (filterParam) {
    case Filter.Active:
      return visibleTodos.filter(todo => !todo.completed);
    case Filter.Completed:
      return visibleTodos.filter(todo => todo.completed);
    case Filter.All:
      return visibleTodos;
    default:
      return visibleTodos;
  }
};

export const countActiveTodos = (todos: Todo[]): number => {
  const activeTodos = todos.filter(todo => !todo.completed);

  return activeTodos.length;
};

export const checkCompletedTodos = (todos: Todo[]): boolean => {
  return todos.some(todo => todo.completed);
};
