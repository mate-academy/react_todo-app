import { Todo } from '../types';
import { Filter } from '../enums';

export function getFilteredTodos(todos: Todo[], filter: Filter) {
  switch (filter) {
    case Filter.All:
      return todos;
    case Filter.Active:
      return todos.filter(({ completed }) => !completed);
    case Filter.Completed:
      return todos.filter(({ completed }) => completed);
  }
}
