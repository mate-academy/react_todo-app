import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (
  key: string,
  initialValue: Todo[],
): [Todo[], (value: (todos: Todo[]) => Todo[]) => void] => {
  const [value, setValue] = useState<Todo[]>(() => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
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
