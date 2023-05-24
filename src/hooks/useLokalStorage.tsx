import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (key: string, initialValue: Todo[]) => {
  const [value, setValue] = useState < Todo[] | [] >(() => {
    try {
      const storedItem = localStorage.getItem(key);

      if (storedItem) {
        return JSON.parse(storedItem) || initialValue;
      }
    } catch {
      return initialValue;
    }

    return initialValue;
  });

  const saveItem = (valueToSet: Todo[]) => {
    setValue(valueToSet);
    localStorage.setItem(key, JSON.stringify(valueToSet));
  };

  return [value, saveItem] as const;
};
