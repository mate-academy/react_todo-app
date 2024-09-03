import { Todo } from '../types/Todo';

export const loadFromLocalStorage = (key: string): Todo[] => {
  const todos = localStorage.getItem(key);

  return todos ? JSON.parse(todos) : [];
};
