import { QueryTodos } from '../constants/queryTodos';
import { Todo } from '../types/Todo';

export function filterTodos(todos: Todo[], query: QueryTodos): Todo[] {
  return todos.filter(todo => {
    switch (query) {
      case QueryTodos.Active:
        return !todo.completed;
      case QueryTodos.Completed:
        return todo.completed;
      case QueryTodos.All:
      default:
        return true;
    }
  });
}
