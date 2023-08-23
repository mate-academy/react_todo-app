import { Todo } from '../types/Todo';

export function toggleAll(todos: Todo[]): Todo[] {
  const hasUncompleted = todos.some(todo => !todo.completed);

  if (hasUncompleted) {
    return todos.map(todo => (
      todo.completed === false
        ? { ...todo, completed: true }
        : todo
    ));
  }

  return todos.map(todo => ({ ...todo, completed: !todo.completed }));
}
