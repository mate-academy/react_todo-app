import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      localStorage.setItem(key, JSON.stringify(startValue));

      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);
      localStorage.setItem(key, JSON.stringify(startValue));

      return startValue;
    }
  });

  const save = (newValue: T | ((prev: T) => T)) => {
    setValue((prev: T) => {
      const valueToStore =
        newValue instanceof Function ? newValue(prev) : newValue;

      try {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch {
        throw new Error('Failed to save to localStorage');
      }

      return valueToStore;
    });
  };

  return [value, save];
}
