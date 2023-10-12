import { useState } from 'react';

import { Todo } from '../types/Todo';

export const useLocalStorage = (): [
  Todo[],
  (newTodos: Todo[]) => void,
] => {
  const [storageTodos, setTodos] = useState<Todo[]>(() => {
    const readTodos = localStorage.getItem('todos');

    return typeof readTodos === 'string' ? JSON.parse(readTodos) : [];
  });

  const saveStorageTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return [storageTodos, saveStorageTodos];
};
