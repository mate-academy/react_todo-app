import { ToDo } from '../Types/ToDo';

export function findMaxId(array: ToDo[] | []) {
  if (array.length === 0) {
    return 1;
  }

  return Math.max(...array.map((todo: ToDo) => todo.id)) + 1;
}

export function getStoredArray() {
  const stored = localStorage.getItem('todos');

  return stored ? JSON.parse(stored) : [];
}

export const chooseActiveArray = (
  button: string,
  arrayAll: ToDo[],
  arrayCompleted: ToDo[],
  arrayActive: ToDo[],
) => {
  if (button === 'all') {
    return arrayAll;
  } else if (button === 'active') {
    return arrayActive;
  } else {
    return arrayCompleted;
  }
};
