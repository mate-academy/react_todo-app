import { useState } from 'react';

export function useLocalStorage<T>(
  valueName: string,
  initialValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (localStorage.getItem(valueName) === null) {
      localStorage.setItem(valueName, JSON.stringify(initialValue));
    }

    const data = localStorage.getItem(valueName);

    if (data === null) {
      return initialValue;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      localStorage.removeItem(valueName);

      return initialValue;
    }
  });

  const changeValue = (newValue: T) => {
    localStorage.setItem(valueName, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, changeValue];
}
