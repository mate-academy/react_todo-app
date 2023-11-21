import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [val: T, saveFn: (newVal: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const saveFn = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [
    value,
    saveFn,
  ];
}
