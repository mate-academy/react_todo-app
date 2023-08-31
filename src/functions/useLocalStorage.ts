import { Dispatch, useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Action } from '../types/Action';

export function useLocaleStorage<T extends Todo[]>(
  key: string,
  startValue: Todo[],
  reducerF: (state: T, action: Action) => T,
): [Todo[], Dispatch<Action>] {
  const storedValue = JSON
    .parse(localStorage.getItem(key) || 'null') || startValue;
  const [value, dispatch] = useReducer(reducerF, storedValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, dispatch];
}
