import { useState } from 'react';
import { Todo } from '../types/Todo';

export function useLocalStorage(key: string, initialValue: Todo[]) {
  const [value, setValue] = useState(() => {
    try {
      const parsedValue = localStorage.getItem(key);

      return parsedValue ? JSON.parse(parsedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: Todo) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}
