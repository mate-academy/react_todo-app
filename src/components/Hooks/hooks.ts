import { useState } from 'react';

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  });

  const save = (newWalue: T) => {
    localStorage.setItem(key, JSON.stringify(newWalue));
    setValue(newWalue);
  };

  return [value, save];
}

export default useLocalStorage;
