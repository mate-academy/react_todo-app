import { useEffect, useState } from 'react';

export const useLocalStorage
  = <T>(
    key: string,
    initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(() => {
      try {
        const storedValue = localStorage.getItem(key);

        return storedValue ? JSON.parse(storedValue) : initialValue;
      } catch {
        return initialValue;
      }
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
  };
