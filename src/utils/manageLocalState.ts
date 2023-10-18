import { Todo } from '../types/Todo';

const key = 'todos';
const initialState: Todo[] = [];

export const getStartingState = (): Todo[] => {
  const data = localStorage.getItem(key);

  if (!data) {
    return initialState;
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    localStorage.removeItem(key);

    return initialState;
  }
};

export const saveState = (newState: Todo[]) => {
  localStorage.setItem(key, JSON.stringify(newState));
};
