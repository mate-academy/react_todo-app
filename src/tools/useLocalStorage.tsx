import { useState } from 'react';
import { Todos } from '../type/Todos';

export const useLocalStorage = (
  key: string,
  initialValue: Todos[],
): [Todos[], (value: (todos: Todos[]) => Todos[]
  ) => void] => {
  const [value, setValue] = useState<Todos[]>(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (data: (todos: Todos[]) => Todos[]) => {
    setValue((prevValue) => {
      const updatedValue = data(prevValue);

      localStorage.setItem(key, JSON.stringify(updatedValue));

      return updatedValue;
    });
  };

  return [value, save];
};
