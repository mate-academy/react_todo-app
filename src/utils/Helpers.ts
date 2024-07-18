import { FilterBy } from '../types/FilterBy';
import { Todo } from '../types/Todo';

export const isAllTodosDone = (todos: Todo[]) =>
  todos.every(todo => todo.completed);

export const getTotalActiveTodos = (todos: Todo[]) =>
  todos.filter(todo => !todo.completed).length;

export const getFilteredTodos = (todos: Todo[], filterBy: FilterBy): Todo[] => {
  return todos.filter(todo => {
    switch (filterBy) {
      case FilterBy.Active:
        return !todo.completed;
      case FilterBy.Completed:
        return todo.completed;
      default:
        return true;
    }
  });
};
