// eslint-disable-next-line
import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (key: string, initialValue: Todo[]) => {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      return savedValue ? JSON.parse(savedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const save = (valueToSave: Todo[]) => {
    setValue(valueToSave);

    localStorage.setItem(key, JSON.stringify(valueToSave));
  };

  return [value, save];
};
