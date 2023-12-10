import { useState } from 'react';
import { Todo } from '../../types/Todo';

export function useLocalStorage(
  key: string,
  startValue: Todo[],
): [Todo[], (v: Todo[]) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  });
  const save = (newValue: Todo[]) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
