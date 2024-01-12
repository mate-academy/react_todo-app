import { StatusTodos } from '../types/StatusTodos';
import { Todo } from '../types/Todo';

export function getFilteredTodos(selectedTodos: StatusTodos, todos: Todo[]) {
  switch (selectedTodos) {
    case StatusTodos.Completed:
      return todos.filter(todo => todo.completed);

    case StatusTodos.Active:
      return todos.filter(todo => !todo.completed);

    default:
      return todos;
  }
}
