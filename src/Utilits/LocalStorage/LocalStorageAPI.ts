import { useState } from 'react';

export function useLocalStorage<T>(key: string, initalValue: T) {
  const [storedValue, setValue] = useState<T>(() => {
    if (typeof window === undefined) {
      return initalValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initalValue;
    } catch {
      return initalValue;
    }
  });

  const saveToLS = (item: T | ((item: T) => T)) => {
    const itemToSave = item instanceof Function ? item(storedValue) : item;

    setValue(itemToSave);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(item));
    }
  };

  return [storedValue, saveToLS] as const;
}
