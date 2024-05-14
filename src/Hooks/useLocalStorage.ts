import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    const savedData = localStorage.getItem(key);

    if (savedData === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(savedData);
    } catch {
      localStorage.removeItem(key);

      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      localStorage.removeItem(key);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
