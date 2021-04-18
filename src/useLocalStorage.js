import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore
        = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return [storedValue, setValue];
};
