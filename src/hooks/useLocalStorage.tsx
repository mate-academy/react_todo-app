import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (v: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      localStorage.setItem(key, JSON.stringify(initialValue));

      return initialValue;
    }

    try {
      return JSON.parse(data) as T;
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: T) => {
    setStoredValue(newValue);

    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [storedValue, save];
}
