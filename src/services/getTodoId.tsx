import { Todo } from '../types/Todo';

export function getTodoId(todos: Todo[]) {
  const maxId = todos.length ? (Math.max(...todos.map(todo => todo.id))) : 0;

  return maxId + 1;
}
