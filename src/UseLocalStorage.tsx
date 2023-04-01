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
      const storedValue = localStorage.getItem(key);

      if (storedValue) {
        return JSON.parse(storedValue);
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
