import { Todo } from '../types/Todo';

export const loadTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem('todos');

    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
