import { useEffect, useReducer } from 'react';
import { Actions, State } from '../types';
import { reducer } from '../store';

export function useLocalReduceStorage(
  key: string,
  startValue: State,
): [State, React.Dispatch<Actions>] {
  const storedValue
    = JSON.parse(localStorage.getItem(key)
      || JSON.stringify(startValue));

  const [store, dispatch] = useReducer(reducer, storedValue);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(store));
  }, [key, store]);

  return [store, dispatch];
}
