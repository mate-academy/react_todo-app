import { useState } from 'react';
import { Todo } from '../types/Todo';

type FunctionReturn = [Todo[], (todosToSet: Todo[]) => void];

export function useLocalStorage(
  key: string,
  initialTodos: Todo[],
): FunctionReturn {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const storedData = localStorage.getItem(key);

      return storedData ? JSON.parse(storedData) : initialTodos;
    } catch (e) {
      return initialTodos;
    }
  });

  const save = (todosToSet: Todo[]) => {
    setTodos(todosToSet);
    localStorage.setItem(key, JSON.stringify(todosToSet));
  };

  return [todos, save];
}
