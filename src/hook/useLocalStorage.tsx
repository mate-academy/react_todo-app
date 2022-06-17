import { useState } from 'react';
import { TodosType } from '../types/TodosType';

export const useLocalStorage = (key: string, initialValue: TodosType[]) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: TodosType[]) => {
    try {
      const toStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(toStore);

      window.localStorage.setItem(key, JSON.stringify(toStore));
    } catch (error) {
      throw new Error('Error');
    }
  };

  return [storedValue, setValue];
};
