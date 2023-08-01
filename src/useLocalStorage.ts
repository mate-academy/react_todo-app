import { useState } from 'react';
import { Todo } from './types/Todo';

export function useLocalStorage(
  key:string,
  initialValue:Todo[],
) {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return initialValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: Todo[]) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}
