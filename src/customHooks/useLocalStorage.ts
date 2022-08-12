import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [item, setItem] = useState<T>(() => {
    const currentKey = localStorage.getItem(key);

    if (currentKey) {
      return JSON.parse(currentKey);
    }

    return initialValue;
  });

  const save = (value: T) => {
    setItem(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [item, save] as const;
}
