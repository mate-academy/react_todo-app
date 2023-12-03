import { Todo } from '../types/Todo';

export function changeStatus(todos: Todo[], todoId: number) {
  return todos.map(todo => (
    todo.id === todoId
      ? { ...todo, completed: !todo.completed }
      : todo
  ));
}
