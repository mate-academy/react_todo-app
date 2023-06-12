import { useState, useEffect } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorageTodos = (): [
  Todo[],
  React.Dispatch<React.SetStateAction<Todo[]>>,
] => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return [todos, setTodos];
};
