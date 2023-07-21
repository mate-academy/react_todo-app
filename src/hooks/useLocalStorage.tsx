import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T):
[T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);

    if (item === null) {
      return initialValue;
    }

    try {
      return JSON.parse(item);
    } catch (error) {
      return initialValue;
    }
  });

  const setItem = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setItem];
}
