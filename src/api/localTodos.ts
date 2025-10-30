import { Todo } from '../types/Todo';

const STORAGE_KEY = 'todos';

export const getStoredTodos = (): Todo[] => {
  const todos = localStorage.getItem(STORAGE_KEY);

  return todos ? JSON.parse(todos) : [];
};

export const saveTodosLocalStorage = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const getTodos = async (): Promise<Todo[]> => {
  return getStoredTodos();
};

export const setTodos = async (todos: Todo[]) => {
  return saveTodosLocalStorage(todos);
};
