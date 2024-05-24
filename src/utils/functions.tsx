import { ToDo } from '../Types/ToDo';

export function findMaxId(array: ToDo[] | []) {
  if (array.length === 0) {
    return 1;
  }

  return Math.max(...array.map((todo: ToDo) => todo.id)) + 1;
}
