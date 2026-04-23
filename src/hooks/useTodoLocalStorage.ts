import { useCallback } from 'react';

import { isTodosArray, Todo } from '../types/todo';

const TODO_LS_KEY = 'todos';

export const useTodoLocalStorage = () => {
  const todosFromLSJSON = localStorage.getItem(TODO_LS_KEY);

  const getTodosFromLS = (): Todo[] => {
    if (!todosFromLSJSON) {
      return [];
    }

    const todosFromLSParsed = JSON.parse(todosFromLSJSON);

    if (isTodosArray(todosFromLSParsed)) {
      return todosFromLSParsed;
    } else {
      return [];
    }
  };

  const setTodosToLS = useCallback((todos: Todo[]) => {
    localStorage.setItem(TODO_LS_KEY, JSON.stringify(todos));
  }, []);

  return {
    setTodosToLS,
    getTodosFromLS,
  };
};
