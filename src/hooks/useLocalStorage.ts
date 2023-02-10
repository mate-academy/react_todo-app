import { useState } from 'react';

export function useLocalStorage<Todo>(key: string, initialValue: Todo):
[Todo, (value: Todo) => void] {
  const [value, setValue] = useState<Todo>(() => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (currentValue: Todo) => {
    setValue(currentValue);
    localStorage.setItem(key, JSON.stringify(currentValue));
  };

  return [value, save];
}
