import { useState } from 'react';

export function useLocalStorage<T>(
  itemName: string,
  initialValue: T,
): [T, (item: T) => void] {
  const [item, setItem] = useState<T>(() => {
    const data = localStorage.getItem(itemName);

    if (data === null) {
      return initialValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      localStorage.removeItem(itemName);

      return initialValue;
    }
  });

  const changeItem = (newItem: T) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return [item, changeItem];
}
