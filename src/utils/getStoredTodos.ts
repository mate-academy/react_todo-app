import { Todo } from '../types/Todo';

export const getStoredTodos = (): Todo[] => {
  const localTodos = localStorage.getItem('todos');

  return localTodos ? JSON.parse(localTodos) : [];
};
