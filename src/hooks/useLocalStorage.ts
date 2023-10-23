import React, { useState, useEffect } from 'react';

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, SetValue<T>] {
  const [todos, setTodos] = useState(() => {
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
    const rawTodos = JSON.stringify(todos);

    localStorage.setItem(key, rawTodos);
  }, [todos, key]);

  return [todos, setTodos];
}
