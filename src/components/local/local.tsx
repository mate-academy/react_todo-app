import { useState } from 'react';

export { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (newValue: React.SetStateAction<T>) => {
    if (typeof newValue === 'function') {
      setTodos((prevTodos: T) => {
        const updatedTodos = (newValue as (prevState: T) => T)(prevTodos);

        localStorage.setItem(key, JSON.stringify(updatedTodos));

        return updatedTodos;
      });
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
      setTodos(newValue);
    }
  };

  return [todos, save];
}
