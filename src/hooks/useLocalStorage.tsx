import { useState } from 'react';
import { Todo } from '../types/todo';

// Вынесите функцию за пределы хука
function getLocalStorage(): Todo[] {
  const data = localStorage.getItem('todos');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

export const useLocalHost = (): [Todo[], (newTodo: Todo[]) => void] => {
  const [value, setValue] = useState<Todo[]>(getLocalStorage);

  function setNewValue(todos: Todo[]): void {
    setValue(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  return [value, setNewValue];
};
