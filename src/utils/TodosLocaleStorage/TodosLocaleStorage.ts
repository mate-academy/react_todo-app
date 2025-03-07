import { Todo } from '../../types/Todo';

const key = 'todos';

export function getTodos(): Todo[] {
  const data = localStorage.getItem(key);

  if (data === null) {
    localStorage.setItem(key, '[]');

    return [];
  }

  try {
    return JSON.parse(data);
  } catch {
    localStorage.removeItem(key);

    return [];
  }
}

export function saveTodos(todoList: Todo[]) {
  const jsonTodosList = JSON.stringify(todoList);

  localStorage.setItem(key, jsonTodosList);
}
