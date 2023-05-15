import { useState } from 'react';
// import { Todo } from '../types/Todo';

export function useLocalStorage<T>(key: string, initialValue: T[] | null) {
  const [value, setValue] = useState(() => {
    try {
      const data = window.localStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}
