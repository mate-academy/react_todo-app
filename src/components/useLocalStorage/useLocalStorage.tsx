import { useState } from 'react';
import { Todo } from '../../types/Todo';

type LocalStorageType = (
  key: string,
  initialValue: Todo[]
) => [value: Todo[], setValue: (value: Todo[]) => void];

export const useLocalStorage: LocalStorageType = (
  key: string,
  initialValue: Todo[],
) => {
  const initial = () => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  const [value, setValue] = useState(initial);
  const saveValue = (item: Todo[]) => {
    setValue(item);
    localStorage.setItem(key, JSON.stringify(item));
  };

  return [value, saveValue];
};
