import React, { useEffect, useState } from 'react';

const getValue = <T>(key: string, initialState: T): T => {
  const storage = localStorage.getItem(key);

  if (storage) {
    return JSON.parse(storage);
  }

  return initialState;
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<T>] {
  const [value, setValue] = useState(getValue<T>(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
