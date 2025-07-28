import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      localStorage.setItem(key, JSON.stringify([]));

      return initialValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
