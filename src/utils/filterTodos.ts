import { Query } from '../types/Query';
import { Todo } from '../types/Todo';

export function filterTodo(todos: Todo[], query: Query) {
  if (query !== 'All') {
    const completed = query === 'Completed';

    return todos.filter(todo => todo.completed === completed);
  }

  return todos;
}
