// prettier-ignore
import { useState } from 'react';

const getStateInitialValue = <T>(key: string, defaultValue: T) => {
  const savedValue = localStorage.getItem(key);

  if (savedValue === null) {
    localStorage.setItem(key, JSON.stringify(defaultValue));

    return defaultValue;
  }

  try {
    return JSON.parse(savedValue);
  } catch (error) {
    localStorage.removeItem(key);

    return defaultValue;
  }
};

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(
    getStateInitialValue<T>(key, defaultValue),
  );

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));

    setValue(newValue);
  };

  return [value, save];
}
