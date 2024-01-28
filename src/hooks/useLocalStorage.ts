import { useEffect, useState } from 'react';

type SetValueAction<T> = T | ((prevValue: T) => T);

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: SetValueAction<T>) => void] {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return startValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
