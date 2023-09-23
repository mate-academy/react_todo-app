import { useEffect, useReducer } from 'react';

export const useLocalStorage = <T, A>(
  key: string,
  reducer: (state: T, action: A) => T,
  initialValue: T,
): [state: T, dispatch: (action: A) => void] => {
  let initialState: T;

  try {
    initialState = JSON.parse(
      localStorage.getItem(key) || JSON.stringify(initialValue),
    );
  } catch {
    initialState = initialValue;
    localStorage.removeItem(key);
  }

  const [todos, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(todos));
  }, [todos]);

  return [todos, dispatch];
};
