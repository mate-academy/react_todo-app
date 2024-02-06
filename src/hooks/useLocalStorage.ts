import { useState } from 'react';

export function useLocalStorage<Todo>(
  key:string,
  initialValue:Todo[],
):[Todo[], (v:Todo[]) => void ] {
  const [data, setData] = useState(() => {
    const localStorageData = localStorage.getItem(key);

    if (!localStorageData) {
      return initialValue;
    }

    try {
      return JSON.parse(localStorageData);
    } catch {
      return initialValue;
    }
  });

  const save = (newValue:Todo[]) => {
    setData(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [data, save];
}
