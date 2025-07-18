import { Todo } from '../types/Todo';

export function saveTodosToLocalStorage(todos: Todo[]) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function getTodosFromLocalStorage(): Todo[] {
  const todosFromStorage = localStorage.getItem('todos');

  if (todosFromStorage) {
    try {
      const parsed = JSON.parse(todosFromStorage);

      if (
        Array.isArray(parsed) &&
        parsed.every(
          todo =>
            typeof todo.id === 'number' &&
            typeof todo.title === 'string' &&
            typeof todo.completed === 'boolean',
        )
      ) {
        return parsed;
      }
    } catch {}
  }

  return [];
}
