import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(startValue);

  useEffect(() => {
    const data = localStorage.getItem(key);

    if (!data) {
      return;
    }

    setValue(JSON.parse(data));
  }, []);

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
