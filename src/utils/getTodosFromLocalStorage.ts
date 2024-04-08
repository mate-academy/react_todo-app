import { LocalStorageKeys } from '../enums/LocalStorageKeys';

export const getTodosFromLocalStorage = () => {
  const data = localStorage.getItem(LocalStorageKeys.todos);

  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  return [];
};
