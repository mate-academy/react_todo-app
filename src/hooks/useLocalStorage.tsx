import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (key: string, initialValue: Todo[]) => {
  const getKey = localStorage.getItem(key);
  const [storValue, setStorValue] = useState(() => {
    try {
      if (getKey !== null) {
        return JSON.parse(getKey) || '';
      }

      return initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (value: Todo[] | ((val: Todo[]) => Todo[])) => {
    const selectedValue = value instanceof Function ? value(storValue) : value;

    setStorValue(selectedValue);
    if (key) {
      localStorage.setItem(key, JSON.stringify(selectedValue));
    }
  };

  return [storValue, save];
};
