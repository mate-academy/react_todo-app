import { useState } from 'react';
import { Todos } from '../Types';

export function useLocalStorage(
  key: string,
  startValue: Todos[],
): [Todos[], React.Dispatch<React.SetStateAction<Todos[]>>] {
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

  const save: React.Dispatch<React.SetStateAction<Todos[]>> = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
