import { useState } from 'react';
import { Todo } from '../interfaces/Todo';

export const useLocalStorage = <T extends Todo[]>(
  key: string,
  initialValue: T,
): [T, (value: (todos: T) => T) => void] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (data: (todos: T) => T) => {
    setValue((prevValue) => {
      const updatedValue = data(prevValue);

      localStorage.setItem(key, JSON.stringify(updatedValue));

      return updatedValue;
    });
  };

  return [value, save];
};
