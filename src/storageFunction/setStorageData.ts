import { Todo } from '../types/Todo';

export function setStorageData(list: Todo[]) {
  const srginfifiedData = JSON.stringify(list);

  localStorage.setItem('todos', srginfifiedData);
}
