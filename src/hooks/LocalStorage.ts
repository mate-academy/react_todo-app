import { useEffect, useState } from 'react';

// Оголошення типу для Todo
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function useLocalStorage<T extends Todo[]>(
  key: string,
  startValue: T,
): [
  T,
  (v: T) => void,
  (id: number) => void,
  () => void,
  () => void,
  (id: number) => void,
  (id: number, title: string) => void
] {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);
      return startValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  const removeTodo = (id: number) => {
    const updatedValue = value.filter((todo) => todo.id !== id);
    setValue(updatedValue);
  };

  const removeAllCompleted = () => {
    const updatedValue = value.filter((todo) => !todo.completed);
    setValue(updatedValue);
  };

  const reverseCompleted = () => {
    const hasIncomplete = value.some((todo) => !todo.completed);
    const updatedValue = value.map((todo) => ({
      ...todo,
      completed: hasIncomplete ? true : false,
    }));
    setValue(updatedValue);
  };

  const completedChecked = (id: number) => {
    const updatedValue = value.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setValue(updatedValue);
  };

  const renameTodo = (id: number, title: string) => {
    const updatedValue = value.map((todo) =>
      todo.id === id ? { ...todo, title } : todo
    );
    setValue(updatedValue);
  };

  return [
    value,
    save,
    removeTodo,
    removeAllCompleted,
    reverseCompleted,
    completedChecked,
    renameTodo,
  ];
}
