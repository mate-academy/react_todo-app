import { useState } from 'react';
import { Todo } from '../types/Todo/Todo';

export const useLocalStorage = (
  key: string,
) => {
  const [value, setValue] = useState(() => {
    try {
      if (localStorage.getItem(key) !== null) {
        return JSON.parse(localStorage.getItem(key) || '');
      }

      return undefined;
    } catch {
      return undefined;
    }
  });

  const save = (item: Todo[] | undefined) => {
    setValue(item);
    localStorage.setItem(key, JSON.stringify(item));
  };

  return [value, save];
};
