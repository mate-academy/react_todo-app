export const getCheckCompleted = <T extends { id: number; completed: boolean }>(
  todos: T[],
) => todos.every(todo => todo.completed);
