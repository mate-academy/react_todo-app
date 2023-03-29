import { Todo } from '../types';

export const saveToLacalStorage = (todo: Todo) => {
  localStorage.setItem('todos',
    localStorage.getItem('todos') + JSON.stringify(todo));
};
