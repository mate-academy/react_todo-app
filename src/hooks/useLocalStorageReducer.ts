import { useCallback, useState } from 'react';

export function useLocalStorageReducer<TValue, TAction>(
  key: string,
  reducerFn: (state: TValue, action: TAction) => TValue,
  initialValue: TValue,
): [TValue, (action: TAction) => void] {
  const [value, setValue] = useState<TValue>(() => {
    const savedValue = localStorage.getItem(key);

    if (!savedValue) {
      localStorage.setItem(key, JSON.stringify(initialValue));

      return initialValue;
    }

    try {
      return JSON.parse(savedValue) as TValue;
    } catch {
      localStorage.removeItem(key);
      localStorage.setItem(key, JSON.stringify(initialValue));

      return initialValue;
    }
  });

  const dispatch = useCallback((action: TAction) => {
    setValue(currentValue => {
      const newValue = reducerFn(currentValue, action);

      localStorage.setItem(key, JSON.stringify(newValue));

      return newValue;
    });
  }, []);

  return [value, dispatch];
}
