import { useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initValue: T,
) => {
  const [value, setValue] = useState<T>(
    JSON.parse(localStorage.getItem(key) || 'null') || initValue,
  );

  const save = (currentValue: T) => {
    setValue(currentValue);
    localStorage.setItem(key, JSON.stringify(currentValue));
  };

  return [value, save];
};
