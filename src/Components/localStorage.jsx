import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storage, setStorage] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore
        = value instanceof Function ? value(storage) : value;

      setStorage(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storage, setValue];
}
