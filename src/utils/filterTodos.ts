import { Links } from '../types/Links';
import { Todo } from '../types/Todo';

export function filterTodos(todos: Todo[], filter: string) {
  switch (filter) {
    case Links.ACTIVE:
      return todos.filter(todo => !todo.completed);
    case Links.COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}
