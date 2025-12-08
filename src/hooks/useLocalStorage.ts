import { Dispatch, SetStateAction, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
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

  const save: Dispatch<SetStateAction<T>> = newValue => {
    setValue(prev => {
      const valueToStore =
        typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(prev)
          : newValue;

      if (Array.isArray(valueToStore) && valueToStore.length === 0) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }

      return valueToStore;
    });
    // localStorage.setItem(key, JSON.stringify(newValue));

    // setValue(newValue);
  };

  return [value, save];
}
