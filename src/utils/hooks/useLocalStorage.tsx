import { useState } from 'react';
import { StorageData } from '../types/type';

export const useLocalStorage = (key: string, initialValue: StorageData) => {
  const getValues = () => {
    const storage = localStorage.getItem(key);

    if (!storage) {
      localStorage.setItem(key, JSON.stringify(initialValue));

      return initialValue;
    }

    return JSON.parse(storage);
  };

  const [value, setValue] = useState(getValues());

  const setData = (newValue: StorageData) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setData];
};
