import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (
  key: string,
  initialValue: Todo[],
): [Todo[], (value: (todos: Todo[]) => Todo[]
  ) => void] => {
  const [value, setValue] = useState<Todo[]>(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (data: (todos: Todo[]) => Todo[]) => {
    setValue((prevValue) => {
      const updatedValue = data(prevValue);

      localStorage.setItem(key, JSON.stringify(updatedValue));

      return updatedValue;
    });
  };

  return [value, save];
};
