import { useState } from 'react';
import { Todo } from '../types/Todo';

export function useLocalStorage<T = Todo>(key: string, initialValue: T):
[T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, save];
}
