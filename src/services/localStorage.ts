import { useState } from 'react';
import { Todo } from '../types/Todo';

export function useLocalStorage(
  key: string,
  startValue: Todo[],
): [Todo[], React.Dispatch<React.SetStateAction<Todo[]>>] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save: React.Dispatch<React.SetStateAction<Todo[]>> = newValue => {
    localStorage.setItem(key, JSON.stringify(newValue));

    setValue(newValue);
  };

  return [value, save];
}
