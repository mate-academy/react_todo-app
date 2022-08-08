import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (newValue: T | ((val: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);

    try {
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const saveValue = (newValue: T | ((val: T) => T)) => {
    const valueToSave = newValue instanceof Function
      ? newValue(value)
      : newValue;

    setValue(valueToSave);
    localStorage.setItem(key, JSON.stringify(valueToSave));
  };

  return [value, saveValue];
}
