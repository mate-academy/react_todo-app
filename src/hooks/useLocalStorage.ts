import { useState } from 'react';

export function useLocalStorage<T>(key: string, startValue: T) {
  const [data, setData] = useState(() => {
    const localData = localStorage.getItem('todos');

    if (!localData) {
      return startValue;
    }

    try {
      return JSON.parse(localData);
    } catch {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  function saveItem(value: T) {
    setData(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [data, saveItem];
}
