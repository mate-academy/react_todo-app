import { useState } from 'react';

export function useLocalStorage<T>(key: string, startValue: T):
[T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const valueFromLocalStorage = localStorage.getItem(key);

    if (!valueFromLocalStorage) {
      return startValue;
    }

    try {
      return JSON.parse(valueFromLocalStorage);
    } catch (e) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
