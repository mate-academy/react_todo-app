import { Todo } from '../types/Todo';

export const loadFromLocalStorage = (): Todo[] => {
  const todos = localStorage.getItem('todos');

  return todos ? JSON.parse(todos) : [];
};

export const deleteFromLocalStorage = (id: number) => {
  let items = loadFromLocalStorage();

  items = items.filter((item: Todo) => item.id !== id);

  localStorage.setItem('todos', JSON.stringify(items));
};
