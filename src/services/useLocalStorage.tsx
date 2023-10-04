import { useEffect, useReducer } from 'react';

import { Action, State } from './Types';
import { reducer } from './reducer';

export function useLocalStorage(
  key: string,
  startValue: State,
): [State, (v: Action) => void] {
  const data = localStorage.getItem(key);
  const initialState = data === null ? startValue : JSON.parse(data);
  const [value, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, dispatch];
}
