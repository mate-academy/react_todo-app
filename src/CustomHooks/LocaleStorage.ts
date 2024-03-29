import { useReducer, Dispatch, useEffect } from 'react';
import { Action } from '../context/TodosContext';
import { ItemType } from '../types/types';

const STORAGE_KEY = 'todos';

const initialTodos = () => {
  const storedTodos = localStorage.getItem(STORAGE_KEY);

  return storedTodos ? JSON.parse(storedTodos) : [];
};

export function useLocalStorage<T>(
  reducer: React.Reducer<ItemType[], Action>,
  StartTodos: T,
): [ItemType[], Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, StartTodos, initialTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
}
