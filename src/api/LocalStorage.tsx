import React from 'react';
import { Todo } from '../types/Todo';

type Props = (
  key: string,
  initialValue: Todo[]
) => [value: Todo[], setValue: (value: Todo[]) => void];

export const useLocalStorage: Props = (key: string, initialValue: Todo[]) => {
  const [value, setValue] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: Todo[]) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};
