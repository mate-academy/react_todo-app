import { useState } from 'react';

type SetterFnType<T> = (value: T) => T;
type LocalStorageReturnType<T> = [
  value: T,
  setter: (value: SetterFnType<T>) => void,
];

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): LocalStorageReturnType<T> => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : initialValue;
  });

  const save = (fn: SetterFnType<T>) => {
    setStoredValue((prevSavedState) => {
      const updatedValue = fn(prevSavedState);

      localStorage.setItem(
        key,
        JSON.stringify(updatedValue),
      );

      return updatedValue;
    });
  };

  return [storedValue, save];
};
