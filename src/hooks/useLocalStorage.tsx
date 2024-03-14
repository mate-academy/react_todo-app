import { useEffect, useContext } from 'react';
import { TodosContext } from '../Store';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const { state, dispatch } = useContext(TodosContext);

  useEffect(() => {
    const savedTodos = localStorage.getItem(key);

    if (savedTodos) {
      dispatch({ type: 'SET_TODOS', payload: JSON.parse(savedTodos) });
    }
  }, [key, dispatch]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state.todos));
  }, [key, state.todos]);

  return initialValue;
}
