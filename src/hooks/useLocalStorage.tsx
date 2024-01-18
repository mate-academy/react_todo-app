import { useState } from 'react';
import { Todo } from '../types/Todo';

export function useLocalStorage(
  key: string, initialValue: Todo[],
): [Todo[], (v: Todo[]) => void] {
  const [value, setValue] = useState(() => {
    /* get value by key from the local storage and save it to the `value` */
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

  // save `value` to the `state` and local storage
  const save = (newValue: Todo[]) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
