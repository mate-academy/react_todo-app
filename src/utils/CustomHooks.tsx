import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (key: string, startValue: Todo[]) => {
  const [value, setValue] = useState(() => {
    try {
      const data = localStorage.getItem(key);

      return data
        ? JSON.parse(data)
        : startValue;
    } catch {
      return startValue;
    }
  });

  const save = (newValue: Todo) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};
