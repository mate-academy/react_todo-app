import { Todo } from '../types/Todo';

export const getTodos = (): Todo[] => {
  return JSON.parse(localStorage.getItem('todos') || '[]');
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
