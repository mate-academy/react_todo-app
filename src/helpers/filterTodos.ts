import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';

export function filterTodos(
  todos: Todo[],
  { filter = TodoStatus.ALL }: { filter: TodoStatus },
) {
  switch (filter) {
    case TodoStatus.ACTIVE:
      return todos.filter(todo => !todo.completed);

    case TodoStatus.COMPLETED:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}
