import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string, startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const storedData = localStorage.getItem(key);

    return storedData ? JSON.parse(storedData) : startValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
