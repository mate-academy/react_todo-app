import { useState } from 'react';
import { Todo } from '../types/Todo';

type Props
= (initialValue: Todo[]) => [value: Todo[], setValue: (value: Todo[]) => void];

export const useLocalStorage: Props = (initialValue: Todo[]) => {
  const [value, setValue] = useState<Todo[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('todos') || '') || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: Todo[]): void => {
    setValue(newValue);
    localStorage.setItem('todos', JSON.stringify(newValue));
  };

  return [value, save];
};
