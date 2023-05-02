import { useState } from 'react';
import { Todo } from './types/todo';

export function useLocalStorage(
  key: string,
  initialValue: Todo[],
): [Todo[], (value: Todo[]) => void] {
  const [value, setValue] = useState<Todo[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch {
      return initialValue;
    }
  });

  const save = (todo: Todo[]) => {
    setValue(todo);
    localStorage.setItem(key, JSON.stringify(todo));
  };

  return [value, save];
}
