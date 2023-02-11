import { useState } from 'react';

export function useLocalStorage<Type>(key: string, initialValue: Type):
[Type, (value: Type) => void] {
  const [value, setValue] = useState<Type>(() => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (currentValue: Type) => {
    setValue(currentValue);
    localStorage.setItem(key, JSON.stringify(currentValue));
  };

  return [value, save];
}
