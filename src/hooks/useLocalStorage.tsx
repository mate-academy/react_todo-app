import { useState } from 'react';

export function useLocalStorage<Ty>(
  key: string,
  startValue: Ty,
): [val: Ty, saveFn: (newVal: Ty) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const saveFn = (newValue: Ty) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [
    value,
    saveFn,
  ];
}
