import { useState } from 'react';

export type SetNewValue<T> =
  (newValue: T | ((prevValue: T) => T)) => void;

type Return<T> = [
  T,
  SetNewValue<T>,
];

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): Return<T> => {
  const [value, setValue] = useState<T>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save: SetNewValue<T> = (newValue) => {
    if (newValue instanceof Function) {
      setValue(prevState => {
        const newState = newValue(prevState);

        localStorage.setItem(key, JSON.stringify(newState));

        return newState;
      });
    } else {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, save];
};

// newValue = prevValue => (
//   [
//     ...prevValue,
//     newTodo,
//   ]
// )

// setTodos(prevValue => (
//   [
//     ...prevValue,
//     newTodo,
//   ]
// ));

export default useLocalStorage;
