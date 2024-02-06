import { useState } from 'react';
import { Todo } from '../../types/Todo';

type FunctionReturn = [Todo[], (setTodos: Todo[]) => void];

export function useLocalStorage(
  key: string,
  initialTodos: Todo[],
): FunctionReturn {
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return initialTodos;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return initialTodos;
    }
  });

  const save = (newValue: Todo[]) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setTodos(newValue);
  };

  return [todos, save];
}
