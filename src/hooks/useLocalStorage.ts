import { useState } from 'react';
import { Todo } from '../types/Todo';

type InitValue = string;

export function useLocalStorage(
  key: string,
  initialValue: InitValue,
) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return JSON.parse(initialValue);
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : JSON.parse(initialValue);
    } catch (error) {
      return JSON.parse(initialValue);
    }
  });

  const setValue = (value: Todo[]) => {
    const valueToStore
      = value instanceof Function ? value(storedValue) : value;

    setStoredValue(valueToStore);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  };

  return [storedValue, setValue];
}
