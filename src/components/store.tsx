import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

export type Todos = {
  id: number;
  title: string;
  completed: boolean;
};

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const filterTodos = (t: Todos[], filter: string) => {
  switch (filter) {
    case Status.Active:
      return t.filter(todo => !todo.completed);
    case Status.Completed:
      return t.filter(todo => todo.completed);
    default:
      return t;
  }
};
