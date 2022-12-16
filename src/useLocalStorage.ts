import { useCallback, useState } from 'react';
import { Todo } from './types/Todo';

export function useLocalStorage<T = Todo>(key: string, initialValue: T):
[T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const save = useCallback(
    (value: T) => {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    [key, storedValue],
  );

  return [storedValue, save];
}
