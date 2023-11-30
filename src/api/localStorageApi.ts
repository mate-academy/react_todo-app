import { Todo } from '../types/Todo';

export const getStoredTodos = () => {
  const storedTodos = localStorage.getItem('todos');

  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const saveToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
