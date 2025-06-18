import { useMemo } from 'react';
import { useTodoContext } from './useTodos';

export const useAllCompleted = () => {
  const { state } = useTodoContext();

  const allCompleted = useMemo(() => {
    return state.todos.length > 0 && state.todos.every(todo => todo.completed);
  }, [state.todos]);

  return allCompleted;
};
