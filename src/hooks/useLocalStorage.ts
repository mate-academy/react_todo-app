import { useCallback, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (!savedValue) {
      localStorage.setItem(key, JSON.stringify(initialValue));

      return initialValue;
    }

    try {
      return JSON.parse(savedValue) as T;
    } catch {
      localStorage.removeItem(key);
      localStorage.setItem(key, JSON.stringify(initialValue));

      return initialValue;
    }
  });

  const saveValue = useCallback((newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  }, []);

  return [value, saveValue];
}
