import { useState, useEffect } from 'react';

export function useLocalStore<T>(
  key: string,
  startValue: T,
): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return startValue;
    }
  });

  useEffect(() => {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, []);

  const save = (newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const updatedValue =
        typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(prev)
          : newValue;

      localStorage.setItem(key, JSON.stringify(updatedValue));
      
      return updatedValue;
    });
  };

  return [value, save];
}
