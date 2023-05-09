import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (key: string, initialValue: Todo[]) => {
  const [value, setValue] = useState(() => {
    try {
      const storage = localStorage.getItem(key);

      return storage ? JSON.parse(storage) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: Todo[]) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};
