import { FilterType, State } from '../types/Todo';

export const getStoredTodos = () => {
  const storedTodos = localStorage.getItem('todos');

  return storedTodos ? JSON.parse(storedTodos) : {
    todos: [],
    filterBy: FilterType.ALL,
  };
};

export const saveToLocalStorage = (state: State) => {
  localStorage.setItem('todos', JSON.stringify(state));
};
