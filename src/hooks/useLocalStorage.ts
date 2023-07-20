import { useState } from 'react';

// eslint-disable-next-line max-len
export function useLocalStorage<T>(key: string, startValue: T): [T, (v: T | ((v: T) => T)) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (newValue: T | ((v: T) => T)) => {
    if (typeof newValue === 'function') {
      const result = (newValue as (v: T) => T)(value);

      localStorage.setItem(key, JSON.stringify(result));
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }

    setValue(newValue);
  };

  return [value, save];
}
