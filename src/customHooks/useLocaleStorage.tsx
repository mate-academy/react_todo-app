import { useState } from 'react';

export function useLocaleStorage <T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const AcceptableKey = localStorage.getItem(key);

    if (AcceptableKey) {
      return JSON.parse(AcceptableKey);
    }

    return initialValue;
  });

  const save = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save] as const;
}
