import { useState } from 'react';
import { Filters } from '../../types';

export const calculateIncompleteTodos = (todos: Todo[]) => {
  return todos.filter(todo => !todo.completed).length;
};

export const getIncompleteTodoIds = (todos: Todo[]) => {
  return todos.filter(todo => todo.completed).map(todo => todo.id);
};

export const getVisibleTodos = (todos: Todo[], appliedFilter: Filters | null) => {
  return todos.filter(todo => {
    switch (appliedFilter) {
      case Filters.active:
        return !todo.completed;
      case Filters.completed:
        return todo.completed;
      default:
        return true;
    }
  });
};

export const convertFilterToEnum = (filterValue: string | null) => {
  switch (filterValue) {
    case 'active':
      return Filters.active;
    case 'completed':
      return Filters.completed;
    default:
      return null;
  }
};

export const useLocalStorage = <T>(key: string, initialValue: T):
[value: T, save: (value: T) => void] => {
  const valueFromStorage = localStorage.getItem(key);
  const [value, setValue] = useState<T>(
    valueFromStorage ? JSON.parse(valueFromStorage) : initialValue,
  );

  const save = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};
