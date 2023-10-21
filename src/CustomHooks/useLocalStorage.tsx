import { Dispatch, useReducer, useEffect } from 'react';
import { todosReducer } from '../services/todosReducer';
import { Todo } from '../types/Todo';
import { Action } from '../types/Action';

export function useLocalStorage(
  key: string,
  startValue: Todo[],
): [Todo[], Dispatch<Action>] {
  const data = localStorage.getItem(key);
  const initialState = data === null ? startValue : JSON.parse(data);
  const [value, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, dispatch];
}
