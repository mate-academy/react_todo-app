import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || initialValue;
    } catch {
      return initialValue;
    }
  });

  const saveInLocalStorage = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, saveInLocalStorage];
};
