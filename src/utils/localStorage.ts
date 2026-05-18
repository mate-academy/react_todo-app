import { Todo } from '../types/Todo';

const TODOS_KEY = 'todos';

export const getSavedTodos = (): Todo[] => {
  const savedTodos = localStorage.getItem(TODOS_KEY);

  if (!savedTodos) {
    return [];
  }

  try {
    return JSON.parse(savedTodos);
  } catch {
    return [];
  }
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};
