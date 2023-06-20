import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (val) => {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  };

  return [value, save];
};
