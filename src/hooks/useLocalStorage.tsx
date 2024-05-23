/* eslint-disable no-console */
import { useState } from 'react';
import { ToDo } from '../types/types';

export const useLocalStorage = (key: string, initialValue: unknown) => {
  const [storedToDos, setstoredToDos] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);

      return initialValue;
    }
  });

  const setValue = (value: ToDo[]) => {
    try {
      setstoredToDos(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedToDos, setValue];
};
