import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      return JSON.parse(localStorage.getItem(key)!) || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (saveValue: T) => {
    setValue(saveValue);
    localStorage.setItem(key, JSON.stringify(saveValue));
  };

  return [value, save];
}
