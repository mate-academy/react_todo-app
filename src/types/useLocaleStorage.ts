import { useEffect, useState } from 'react';

export function useLocaleStorage<T>(
  key: string,
  startValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
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

  // Save after each change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
