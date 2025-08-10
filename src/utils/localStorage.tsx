/* eslint-disable no-console */
import { Todo } from '../types/Todo';

export const TODOS_KEY = 'todos';

export const loadTodos = (): Todo[] => {
  try {
    const todosFromStorage = localStorage.getItem(TODOS_KEY);

    if (!todosFromStorage) {
      return [];
    }

    return JSON.parse(todosFromStorage);
  } catch {
    return [];
  }
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};
