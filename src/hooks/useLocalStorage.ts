import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      localStorage.removeItem(key);

      return defaultValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, save];
};
