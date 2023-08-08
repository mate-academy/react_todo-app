import { useState } from 'react';
import { Todo } from '../types/Todo';

export function useLocalStorage(
  key: string,
  startValue: Todo[],
): [Todo[], (v: Todo[]) => void] {
  const [value, setValue] = useState(() => {
    const localData = localStorage.getItem(key);

    if (localData === null) {
      return startValue;
    }

    try {
      return JSON.parse(localData) as Todo[];
    } catch (e) {
      return startValue;
    }
  });

  const save = (newValue: Todo[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (e) {
      // TODO: error handling
    }
  };

  return [value, save];
}
