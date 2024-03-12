import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startTodos: T,
): [T, (items: T) => void] {
  const [newTodos, setNewTodos] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (!data) {
      return startTodos;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startTodos;
    }
  });

  const save = (todoItems: T): void => {
    localStorage.setItem(key, JSON.stringify(todoItems));
    setNewTodos(todoItems);
  };

  return [newTodos, save];
}
