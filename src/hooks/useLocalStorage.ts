import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (key: string,
  initialValue: Todo[] | string | boolean) => {
  const [value, setValue] = useState(() => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (currentValue: Todo[]) => {
    setValue(currentValue);
    localStorage.setItem(key, JSON.stringify(currentValue));
  };

  return [value, save];
};
