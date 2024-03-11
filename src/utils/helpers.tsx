import { useState } from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum Filters {
  All,
  Active,
  Completed,
}

export function useLocalStorage<T>(key: string, initialValue: T[]) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  const save = (newValue: T[]) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

export function handledTabs(tabTitle: Filters, arr: Todo[]) {
  switch (tabTitle) {
    case Filters.Active:
      return [...arr].filter(t => !t.completed);
    case Filters.Completed:
      return [...arr].filter(t => t.completed);
    default:
      return arr;
  }
}
