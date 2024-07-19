import { Todo } from './todo_items/todo';

export const saveToLocalStorage = (key: string, value: Todo[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
