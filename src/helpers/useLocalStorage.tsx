import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (key: string, initialValue: Todo[]):
[Todo[], (arrOfTodos: Todo[]) => void] => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const item = localStorage.getItem(key);

      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (arrOfTodos: Todo[]) => {
    setTodos(arrOfTodos);
    localStorage.setItem(key, JSON.stringify(arrOfTodos));
  };

  return [todos, save];
};
