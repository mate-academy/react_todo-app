import {
  useState, useEffect, SetStateAction, Dispatch,
} from 'react';

export const useLocalStorage = <T>(
  startValue: T,
  key: string,
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>((): T => {
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

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
