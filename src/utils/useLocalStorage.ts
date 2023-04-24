import { useState } from 'react';

type ReturnedValue<T> = [
  T,
  (newValue: T) => void,
];

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): ReturnedValue<T> => {
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

  const save = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};
