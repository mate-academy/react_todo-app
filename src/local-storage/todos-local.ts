import { Todo } from '../types';

const LOCAL_STORAGE_KEY = 'todos';

export const getTodosFromLocalStorage = () => {
  const todos = localStorage.getItem(LOCAL_STORAGE_KEY);

  return todos ? JSON.parse(todos) : [];
};

export const setTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};
