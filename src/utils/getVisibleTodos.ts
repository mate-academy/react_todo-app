import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export function getVisibleTodos(todos: Todo[], filter: Filter) {
  if (filter !== Filter.All) {
    return [...todos].filter(todo => {
      return filter === Filter.Completed ? todo.completed : !todo.completed;
    });
  }

  return todos;
}
