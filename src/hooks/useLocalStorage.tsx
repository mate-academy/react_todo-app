import { useEffect, useReducer } from 'react';

export function useLocalStorage<T, A>(
  key: string,
  reducer: (state: T, action: A) => T,
  initialState: T,
): [T, (action: A) => void] {
  const init = (initState: T) => {
    const storedState = localStorage.getItem(key);

    if (storedState !== null) {
      try {
        const newInitialState: T = JSON.parse(storedState);

        return newInitialState;
      } catch {
        localStorage.removeItem(key);

        return initState;
      }
    }

    return initState;
  };

  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}
