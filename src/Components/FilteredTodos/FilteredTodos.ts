import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

export const getFilteredTodos = (todos: Todo[], filter: string): Todo[] => {
  switch (filter) {
    case Filter.Active:
      return todos.filter(todo => !todo.completed);
    case Filter.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
