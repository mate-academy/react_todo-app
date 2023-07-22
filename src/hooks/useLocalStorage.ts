import { useState, useEffect } from 'react';

// eslint-disable-next-line max-len
export function useLocalStorage<T>(key: string, initialValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return initialValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
