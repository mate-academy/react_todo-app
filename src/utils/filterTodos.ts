import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[] | null, filter: Filter) => {
  const filteredTodos = todos?.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return todo.completed === false;
      case Filter.Completed:
        return todo.completed === true;
      default:
        return todo;
    }
  });

  return filteredTodos || [];
};
