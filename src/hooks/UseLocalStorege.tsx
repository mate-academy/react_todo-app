import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState(() => {
    const date = localStorage.getItem(key);

    if (!date) {
      return initialValue;
    }

    try {
      return JSON.parse(date);
    } catch (e) {
      return initialValue;
    }
  });

  const newDateId = +new Date();

  JSON.stringify(newDateId);

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(save));
    setValue(newValue);
  };

  return [value, save];
}
