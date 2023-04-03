import { useState } from 'react';
import { Todo } from '../types/Todo/Todo';

export const useLocalStorage = (
  key: string,
) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch {
      return [];
    }
  });

  const save = (item: Todo[] | undefined) => {
    setValue(item);
    localStorage.setItem(key, JSON.stringify(item));
  };

  return [value, save];
};
