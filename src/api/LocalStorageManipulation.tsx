import { Todo } from '../types/todo';

export const getTodosFromLS = () => {
  return JSON.parse(localStorage.getItem('todos') || '[]');
};

export const uploadTodosToLS = (todosArray: Todo[]) => {
  return localStorage.setItem('todos', JSON.stringify(todosArray));
};
