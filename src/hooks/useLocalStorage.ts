import { useState } from 'react';
import { StorageKey } from '../utils/enums';

export const useLocalStorage = <T>(key: StorageKey, initialValue: T) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (val: T) => {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  };

  return [value, save];
};
