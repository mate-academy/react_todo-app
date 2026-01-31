import { Todo } from '../types/Todo';

const TODOS_KEY = 'todos';

export function loadTodos(): Todo[] {
  const data = localStorage.getItem(TODOS_KEY);

  return data ? JSON.parse(data) : [];
}

export function saveTodos(todos: Todo[]) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}
