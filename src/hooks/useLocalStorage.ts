import {
  useState, useEffect, SetStateAction, Dispatch,
} from 'react';

export const useLocalStorage = <T>(
  initialValue: T,
  key: string,
): [T, Dispatch<SetStateAction<T>>] => {
  const getValue = (): T => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      return JSON.parse(storageValue);
    }

    return initialValue;
  };

  const [value, setValue] = useState<T>(getValue());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
