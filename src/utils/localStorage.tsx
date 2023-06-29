import { useState } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: string | string[] | null = null,
) => {
  const [element, setElement] = useState(() => {
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

  const save = (value: string) => {
    setElement(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [element, save];
};
