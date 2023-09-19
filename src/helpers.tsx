import { useState, useEffect } from 'react';
import { Status, Todo } from './types';

export function useLocalStorage<T>(
  key: string, startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const storedData = localStorage.getItem(key);

    return storedData ? JSON.parse(storedData) : startValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export const filterTodos = (todos: Todo[], fitlerParam: Status) => {
  switch (fitlerParam) {
    case Status.Active:
      return todos.filter(todo => todo.completed === false);
    case Status.Completed:
      return todos.filter(todo => todo.completed === true);
    default:
      return todos;
  }
};
