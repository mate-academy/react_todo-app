import { useEffect, useState } from 'react';

function getInitialValue<T>(key: string, defaultValue: T) {
  const storageValue = localStorage.getItem(key);

  return storageValue ? JSON.parse(storageValue) : defaultValue;
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, (a: T) => void] {
  debugger;
  const [value, setValue] = useState(() => {
    return getInitialValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
