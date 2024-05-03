import { useState } from 'react';
import { Todo } from '../types/Todo';

export function useLocalStorage<T>(key: string, startValue: T) {
  const [value, setValue] = useState(() => {
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

  const [filteredTodo, setFilteredTodo] = useState(() => {
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

  const save = (newValue: T) => {
    const currentData: Todo[] = JSON.parse(localStorage.getItem(key) || '[]');

    const newData = [
      ...currentData,
      {
        id: +new Date(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 1,
        title: newValue,
        completed: false,
      },
    ];

    setValue(newData);
    setFilteredTodo(newData);

    localStorage.setItem(key, JSON.stringify(newData));
  };

  const update = (id: number, updatedValue: string, todoCompleted: boolean) => {
    const currentData = JSON.parse(localStorage.getItem(key) || '[]');
    let newData;

    if (updatedValue.trim() === '') {
      newData = currentData.filter((todo: Todo) => todo.id !== id);
    } else {
      newData = currentData.map((todo: Todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: updatedValue,
            completed: todoCompleted,
            updatedAt: new Date().toISOString(),
          };
        } else {
          return todo;
        }
      });
    }

    setValue(newData);
    setFilteredTodo(newData);

    localStorage.setItem(key, JSON.stringify(newData));
  };

  const clear = (id?: number) => {
    const currentData = JSON.parse(localStorage.getItem(key) || '[]');
    let newData;

    if (id !== undefined) {
      newData = currentData.filter((todo: Todo) => todo.id !== id);
    } else {
      newData = currentData.filter((todo: Todo) => todo.completed !== true);
    }

    if (newData.length !== 0) {
      setValue(newData);
      setFilteredTodo(newData);

      localStorage.setItem(key, JSON.stringify(newData));
    } else {
      setValue(newData);
      setFilteredTodo(newData);
      localStorage.clear();
    }
  };

  const filter = (filterName: string) => {
    const currentData = JSON.parse(localStorage.getItem(key) || '[]');

    switch (filterName) {
      case 'all':
        setFilteredTodo(currentData);
        break;
      case 'active':
        setFilteredTodo(
          currentData.filter((todo: Todo) => todo.completed === false),
        );
        break;
      case 'completed':
        setFilteredTodo(
          currentData.filter((todo: Todo) => todo.completed === true),
        );
        break;
      default:
        setFilteredTodo(currentData);
        break;
    }
  };

  return [value, filteredTodo, save, update, clear, filter];
}
