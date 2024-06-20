import { Todo } from '../types/Todo';
import { TodoFilter } from '../types/TodoFilter';

export function getVisibleTodos(todos: Todo[], filter: TodoFilter) {
  switch (filter) {
    case TodoFilter.all:
      return [...todos];

    case TodoFilter.active:
      return todos.filter(todo => !todo.completed);

    case TodoFilter.completed:
      return todos.filter(todo => todo.completed);
  }
}
