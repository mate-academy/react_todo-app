import { useState } from 'react';

type ReturnValue<T> = [
  T,
  (newValue: T) => void,
];

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): ReturnValue<T> {
  const [value, setValue] = useState<T>(() => {
    try {
      const localStorageValue = localStorage.getItem(key);

      if (localStorageValue) {
        return JSON.parse(localStorageValue);
      }

      return initialValue;
    } catch {
      return initialValue;
    }
  });

  const saveToStorage = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, saveToStorage];
}
