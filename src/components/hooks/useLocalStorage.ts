import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startTodos: T,
): [T, (v: T) => void] {
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startTodos;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startTodos;
    }
  });

  const save = (newTodos: T) => {
    localStorage.setItem(key, JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  return [todos, save];
}
