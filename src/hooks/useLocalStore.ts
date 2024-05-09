import { useEffect, useState } from 'react';

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

const useLocalStorage = <T>(
  storageKey: string,
  fallbackState?: T,
): [T, SetValue<T>] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(storageKey);

    return storedValue ? JSON.parse(storedValue) : fallbackState;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

export default useLocalStorage;
