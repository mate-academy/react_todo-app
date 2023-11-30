import { initialState } from '../constants/initialState';

export const getLocalStorageValue = () => {
  const todos = localStorage.getItem('todos');

  return {
    ...initialState,
    todos: todos ? JSON.parse(todos) : [],
  };
};
