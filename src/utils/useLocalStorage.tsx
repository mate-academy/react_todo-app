import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (key: string, initialValue: Todo[]) => {
  const [value, setValue] = useState(() => {
    try {
      const valueFromStorage = localStorage.getItem(key);

      return valueFromStorage
        ? JSON.parse(valueFromStorage)
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  const saveValue = (valueForSaving: Todo[]) => {
    setValue(valueForSaving);
    localStorage.setItem(key, JSON.stringify(valueForSaving));
  };

  return [value, saveValue];
};
