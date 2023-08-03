import { Dispatch, SetStateAction, useState } from 'react';

export function useLocalStorage<T>(
  key: string, startValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save: Dispatch<SetStateAction<T>> = (newValue: SetStateAction<T>) => {
    if (typeof newValue === 'function') {
      setValue((prevValue: T) => {
        const updatedValue = (newValue as (prevState: T) => T)(prevValue);

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
