import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const saveData = (data: T) => {
    setValue(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  return [value, saveData];
}
