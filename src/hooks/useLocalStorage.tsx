import { useEffect, useReducer } from 'react';

export function useLocalStorage<T, A>(
  key: string,
  reducer: (state: T, action: A) => T,
  initialState: T,
  setAction: A,
): [T, (action: A) => void] {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedState = localStorage.getItem(key);

    if (storedState !== null) {
      try {
        const newInitialState: T = JSON.parse(storedState);

        const localAction: A = { ...setAction, payload: newInitialState };

        dispatch(localAction);
      } catch {
        localStorage.removeItem(key);

        const localAction: A = { ...setAction, payload: initialState };

        dispatch(localAction);
      }

      return;
    }

    const localAction: A = { ...setAction, payload: initialState };

    dispatch(localAction);
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}
