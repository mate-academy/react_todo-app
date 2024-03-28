import { useState } from 'react';

export function useLocalStorage<T>(
  todos: string,
  startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(todos);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(todos);

      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(todos, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
