import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T[],
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return initialValue;
    }

    try {
      return JSON.parse(storedValue);
    } catch (error) {
      localStorage.removeItem(key);

      return initialValue;
    }
  });

  // localStorage.clear();

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
