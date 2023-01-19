import { Todo } from '../types/Todo';

export const getTodosFromLS = () => {
  return JSON.parse(localStorage.getItem('todos') || '[]');
};

export const uploadTodosToLS = (todosArray: Todo[]) => {
  return localStorage.setItem('todos', JSON.stringify(todosArray));
};
