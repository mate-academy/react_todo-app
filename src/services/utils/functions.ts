import { Filter } from '../enums';
import { Todo } from '../types/Todo';
import { FilterParams } from '../types/types';

const filterTodosByCompleted = (todos: Todo[], filter: Filter): Todo[] => {
  switch (filter) {
    case (Filter.ACTIVE): {
      return todos.filter(todo => !todo.completed);
    }

    case (Filter.COMPLETED): {
      return todos.filter(todo => todo.completed);
    }

    default:
      return todos;
  }
};

export const filterTodos = (
  todos: Todo[],
  { filterBy }: FilterParams,
): Todo[] => {
  return filterBy
    ? filterTodosByCompleted(todos, filterBy)
    : todos;
};
