import { useContext } from 'react';
import { TodoContext, TodoContextValue } from '../context/TodoProvider';

export const useTodo = (): TodoContextValue => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error();
  }

  return context;
};
