import { useState } from 'react';

export function useLocalStorage<T>(
  key: string, startValue: T,
): [T, (v: T) => void] {
  const [state, setState] = useState(() => {
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

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setState(newValue);
  };

  return [state, save];
}
