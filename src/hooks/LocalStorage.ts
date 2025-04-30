// import { useState } from 'react';

import { useState } from 'react';

type SerializableValue =
  | string
  | number
  | boolean
  | null
  | SerializableObject
  | SerializableArray;
type SerializableObject = { [key: string]: SerializableValue };
type SerializableArray = SerializableValue[];

export function useLocalStorage<T extends SerializableValue>(
  key: string,
  defaultValue: T,
): [T, (newValue: T) => void] {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(storedValue);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      localStorage.removeItem(key);

      return defaultValue;
    }
  });

  const setCount = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setCount] as const;
}
