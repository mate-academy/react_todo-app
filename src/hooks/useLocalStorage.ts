import { useState } from 'react';
import { Todo } from '../types/Todo';

export function useLocalStorage(
  key: string,
  defaultItems: Todo[],
): [Todo[], (i: Todo[]) => void] {
  const [list, setList] = useState(() => {
    const data = localStorage.getItem(key);

    if (!data) {
      return defaultItems;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      localStorage.removeItem(key);

      return defaultItems;
    }
  });

  const saveList = (newItems: Todo[]) => {
    localStorage.setItem(key, JSON.stringify(newItems));

    setList(newItems);
  };

  return [list, saveList];
}
