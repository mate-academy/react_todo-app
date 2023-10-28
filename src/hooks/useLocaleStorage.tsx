import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T[],
): [T[], (v: T[]) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return initialValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return initialValue;
    }
  });

  const save = (newValue: T[]) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}
