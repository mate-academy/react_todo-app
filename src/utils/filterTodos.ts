import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

export const filterTodos = (todos: Todo[], type: Filter) => {
  switch (type) {
    case Filter.Completed:
      return todos.filter(todo => todo.completed === true);
    case Filter.Active:
      return todos.filter(todo => todo.completed === false);
    default:
      return todos;
  }
};
