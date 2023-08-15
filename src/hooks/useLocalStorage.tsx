import { useState } from 'react';
import { Todo } from '../types/Todo';

export function useLocalStorage(
  key: string,
  startValue: Todo[],
): [Todo[], (value: Todo[]) => void] {
  const [value, setValue] = useState<Todo[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch {
      return startValue;
    }
  });

  const save = (todo: Todo[]) => {
    setValue(todo);
    localStorage.setItem(key, JSON.stringify(todo));
  };

  return [value, save];
}
