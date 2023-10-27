import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T[],
) {
  const [value, setValue] = useState<T[]>(() => {
    /* get value by key from the local storage and save it to the `value` */
    const data = localStorage.getItem(key);

    if (data === null) {
      return initialValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return initialValue;
    }
  });

  // save `value` to the `state` and local storage
  const save = (val: T[]) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(val));
  };

  return { value, save };
}
