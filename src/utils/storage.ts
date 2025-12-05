import { LOCAL_STORAGE_KEY } from '../constants/filters';
import { Todo } from '../types/todo';

export const loadTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);

    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveTodosToStorage = (todos: Todo[]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};
