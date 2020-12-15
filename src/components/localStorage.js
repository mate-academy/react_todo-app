import { useState } from 'react';

export const useLocalStorage = (key) => {
  let initialValue = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];

  localStorage.setItem(key, JSON.stringify(initialValue));

  const [value, setValue] = useState(initialValue);

  const addValue = (newValue) => {
    setValue(newValue);
    initialValue = newValue;
    localStorage.setItem(key, JSON.stringify(initialValue));
  };

  return [value, addValue];
};
