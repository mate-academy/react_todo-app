import { useState } from 'react';
import { Client } from '../types/Client';
import { getCheckCompleted } from '../utils/getCheckCompleted';

export function useLocalStorage<T extends { id: number; completed: boolean }>(
  key: string,
  startValue: T[],
): [T[], Client<T>] {
  const [value, setValue] = useState<T[]>(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      localStorage.setItem(key, JSON.stringify(startValue));

      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const syncLocalStorage = (todos: T[]) => {
    localStorage.setItem(key, JSON.stringify(todos));
  };

  const checkCompleted = getCheckCompleted<T>(value);

  const client: Client<T> = {
    add: newTodo => {
      const newTodos = [...value, { id: Date.now(), ...newTodo } as T];

      syncLocalStorage(newTodos);
      setValue(newTodos);
    },
    update: updatedTodo => {
      const newTodos = value.map((todo: T) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo,
      );

      syncLocalStorage(newTodos);
      setValue(newTodos);
    },
    delete: todoId => {
      const newTodos = value.filter((todo: T) => todo.id !== todoId);

      syncLocalStorage(newTodos);
      setValue(newTodos);
    },
    clearCompleted: () => {
      const newTodos = value.filter((todo: T) => !todo.completed);

      syncLocalStorage(newTodos);
      setValue(newTodos);
    },
    toggle: () => {
      const newTodos = value.map((todo: T) => {
        if (todo.completed !== !checkCompleted) {
          const updated = {
            ...todo,
            completed: !checkCompleted,
          };

          return updated;
        }

        return todo;
      });

      syncLocalStorage(newTodos);
      setValue(newTodos);
    },
  };

  return [value, client];
}
