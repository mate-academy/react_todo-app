import { useState } from 'react';

export function useLocalStorage<T>(key: string, t: T) {
  const [value, setValeu] = useState(() => {
    try {
      const data = localStorage.getItem(key);

      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return t;
  });

  const save = (data: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      setValeu(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return [value, save];
}
