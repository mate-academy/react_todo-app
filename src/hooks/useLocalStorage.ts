import { useState } from 'react';
import { Todos } from '../types/Todos';

export function useLocalStorage(
  key: string, defoultItems: Todos[],
): [Todos[], (i: Todos[]) => void] {
  const [list, setList] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return defoultItems;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      localStorage.removeItem(key);

      return defoultItems;
    }
  });

  const saveList = (newItems: Todos[]) => {
    localStorage.setItem(key, JSON.stringify(newItems));
    setList(newItems);
  };

  return [list, saveList];
}
