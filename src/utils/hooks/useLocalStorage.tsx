/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: any) => {
  const getValues = () => {
    const storage = localStorage.getItem(key);

    if (!storage) {
      localStorage.setItem(key, JSON.stringify(initialValue));

      return initialValue;
    }

    return JSON.parse(storage || '');
  };

  const [value, setValue] = useState<any>(getValues());

  const setTodos = (newValue: any) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setTodos];
};
