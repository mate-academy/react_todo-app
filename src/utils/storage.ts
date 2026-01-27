import { Todo } from '../types/Todo';

const STORAGE_KEY = 'todos';

export const loadTodos = (): Todo[] => {
  const stateFromStorage = localStorage.getItem(STORAGE_KEY);

  if (!stateFromStorage) {
    return [];
  }

  try {
    return JSON.parse(stateFromStorage) as Todo[];
  } catch {
    return [];
  }
};

export const savedTodos = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};
