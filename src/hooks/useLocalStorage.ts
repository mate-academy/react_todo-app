import { useState } from 'react';

export function useLocalStorage<Todo>(key: string, initialValue: Todo) :
[Todo, (value: Todo) => void] {
  const [value, setValue] = useState<Todo>(() => {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : initialValue;
  });

  const save = (newValue: Todo) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}
