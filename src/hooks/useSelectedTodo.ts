import { useCallback, useLayoutEffect, useState } from 'react';
import { Todo } from '../types/Todo';

export const useSelectedTodo = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedTodo) {
        setSelectedTodo(null);
      }
    },
    [setSelectedTodo],
  );

  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedTodo, handleKeyPress]);

  return { selectedTodo, setSelectedTodo };
};
