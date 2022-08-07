import { useState } from 'react';

export function useLocaleStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const prevValue = window.localStorage.getItem(key);

      return prevValue ? JSON.parse(prevValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (newValue: T | ((val: T) => T)) => {
    const valueToStore = newValue instanceof Function
      ? newValue(storedValue)
      : newValue;

    setStoredValue(valueToStore);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  };

  return [storedValue, setValue] as const;
}
