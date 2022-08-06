import { useState } from 'react';

export function useLocaleStorage <T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(
    JSON.parse(localStorage.getItem(key) || '') || initialValue,
  );

  const save = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save] as const;
}
