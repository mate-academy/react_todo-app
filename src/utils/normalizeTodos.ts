import { Status, Todo } from '../types';

export default function normalizeTodos(todos: Todo[], status: Status) {
  switch (status) {
    case Status.ACTIVE:
      return todos.filter(todo => !todo.completed);
    case Status.COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}
