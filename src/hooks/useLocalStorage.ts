import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
) :[T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return initialValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return initialValue;
    }
  });

  const save = (values: T) => {
    setValue(values);
    localStorage.setItem(key, JSON.stringify(values));
  };

  return [value, save];
}
