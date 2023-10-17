import { useState, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (e: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (!data) {
      return initialValue;
    }

    try {
      return JSON.parse(data) as T;
    } catch {
      return initialValue;
    }
  });

  const save = useCallback((newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  }, [key]);

  return [value, save];
}
