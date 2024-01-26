import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key) as string;

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

  useEffect((): void => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
