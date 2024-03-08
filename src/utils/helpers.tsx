import { useState } from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
export interface TodoListProps {
  filteredTodos: Todo[];
}

export interface TodoProps {
  todo: Todo;
}

export enum Tabs {
  All,
  Active,
  Completed,
}

export interface ContextPropsMyTodos {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export interface ContextPropsFilteredTodos {
  filteredTodos: Todo[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export interface ContextPropsCurrentTab {
  currentTab: Tabs;
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

export function handledTabs(tabTitle: Tabs, arr: Todo[]) {
  switch (tabTitle) {
    case Tabs.Active:
      return [...arr].filter(t => !t.completed);
    case Tabs.Completed:
      return [...arr].filter(t => t.completed);
    default:
      return arr;
  }
}
