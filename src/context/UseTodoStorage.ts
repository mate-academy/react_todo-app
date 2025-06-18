import { useEffect } from 'react';
import { Todo } from '../entities/Todo';

export const useTodoStorage = (
  todos: Todo[],
  setTodosFromLocalStorage: (todos: Todo[]) => void,
) => {
  useEffect(() => {
    const localData = localStorage.getItem('todos');

    if (localData) {
      try {
        const parsed = JSON.parse(localData);

        if (Array.isArray(parsed)) {
          setTodosFromLocalStorage(parsed);
        }
      } catch {
        alert('Invalid JSON in localStorage for todos');
      }
    }
  }, [setTodosFromLocalStorage]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
};
