import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage<T>(key: string, initialValue: T)
  : [T, SetValue<T>] {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
