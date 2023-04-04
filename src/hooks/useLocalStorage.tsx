import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (key: string, initialValue: Todo[]) => {
  const [value, setValue] = useState(() => {
    try {
      const valueInStorage = localStorage.getItem(key);

      return valueInStorage ? JSON.parse(valueInStorage) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const saveValue = (valueToSave: Todo[]) => {
    setValue(valueToSave);
    localStorage.setItem(key, JSON.stringify(valueToSave));
  };

  return [value, saveValue];
};
