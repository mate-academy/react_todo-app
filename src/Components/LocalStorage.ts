import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key:string, startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const currentValue = localStorage.getItem(key);

    return currentValue ? JSON.parse(currentValue) : startValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
