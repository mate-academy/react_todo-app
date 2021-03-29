import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || initValue;
    } catch {
      return initValue;
    }
  });
  const save = (todos) => {
    setValue(todos);
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, save];
};
