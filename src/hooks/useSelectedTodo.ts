import { useLayoutEffect, useState } from 'react';
import { Todo } from '../types/Todo';

export const useSelectedTodo = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && selectedTodo) {
      setSelectedTodo(null);
    }
  };
  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedTodo]);

  return { selectedTodo, setSelectedTodo };
};
