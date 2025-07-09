import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';

export function filterTodos(todos: Todo[], status: TodoStatus): Todo[] {
  switch (status) {
    case TodoStatus.Active:
      return todos.filter(todo => !todo.completed);
    case TodoStatus.Completed:
      return todos.filter(todo => todo.completed);
    case TodoStatus.All:
      return todos;
  }
}
