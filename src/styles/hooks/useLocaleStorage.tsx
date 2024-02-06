import { useState } from 'react';
import { NewTodoItem } from '../types/NewTodoItem';

export function useLocaleStorage<T>(key: string, initialValue: T) {
  const [data, setData] = useState(() => {
    const localStorageData = localStorage.getItem(key);

    if (!localStorageData) {
      return initialValue;
    }

    try {
      return JSON.parse(localStorageData);
    } catch {
      return initialValue;
    }
  });

  const save = (newValue:NewTodoItem[]) => {
    setData(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [data, save];
}
