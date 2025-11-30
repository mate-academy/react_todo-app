import { Todo } from '../types/Todo';

const STORAGE_KEY = 'todos';

const getInitialTodos = (): Todo[] => {
  const storedTodos = localStorage.getItem(STORAGE_KEY);

  try {
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (err) {
    return [];
  }
};

export const saveTodos = (todos: Todo[]): void => {
  const jsonTodos = JSON.stringify(todos);

  localStorage.setItem(STORAGE_KEY, jsonTodos);
};

export const initialState: Todo[] = getInitialTodos();
