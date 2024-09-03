import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (newValue: T | ((prev: T) => T)) => {
    const valueToStore =
      newValue instanceof Function ? newValue(value) : newValue;

    localStorage.setItem(key, JSON.stringify(valueToStore));
    setValue(valueToStore);
  };

  return [value, save];
}
