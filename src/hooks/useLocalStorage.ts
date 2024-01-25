import { useCallback, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
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

  const save = useCallback((newValue: T | ((val: T) => T)) => {
    setValue((prevValue: T) => {
      const updatedValue = typeof newValue === 'function'
        ? (newValue as (val: T) => T)(prevValue)
        : newValue;

      localStorage.setItem(key, JSON.stringify(updatedValue));

      return updatedValue;
    });
  }, [key]);

  return [value, save];
}
