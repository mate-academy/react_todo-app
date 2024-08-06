import { useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(savedValue);
    } catch (error) {
      localStorage.removeItem(key);

      return defaultValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
