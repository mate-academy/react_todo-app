import { useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string, startValue: T,
): [T, (v: T | ((n: T) => T)) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data) as T;
    } catch {
      return startValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
