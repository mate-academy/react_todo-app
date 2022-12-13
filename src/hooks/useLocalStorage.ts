import { useCallback, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T):
[T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const save = useCallback(
    (newValue:T) => {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    [key, value],
  );

  return [value, save];
}
