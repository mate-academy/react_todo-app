import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T | ((currentValue: T) => T)) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      return startValue;
    }
  });

  const save = (newValue: T | ((currentValue: T) => T)) => {
    if (typeof newValue === 'function') {
      setValue((currentValue: T) => {
        const updatedValue = (newValue as (currentValue: T) => T)(currentValue);

        localStorage.setItem(key, JSON.stringify(updatedValue));

        return updatedValue;
      });
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    }
  };

  return [value, save];
}
