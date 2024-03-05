import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    const data = localStorage.getItem(key) || '';

    if (!data) {
      return initialValue;
    }

    return JSON.parse(data);
  });

  useEffect(() => {
    const stateStringify = JSON.stringify(state);

    localStorage.setItem(key, stateStringify);
  }, [state, key]);

  return { state, setState };
};
