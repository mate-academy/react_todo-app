import { useContext } from 'react';
import { TodoStateContext } from '../context/TodoContext';

export const useTodoState = () => {
  const state = useContext(TodoStateContext);

  if (!state) {
    throw new Error('useTodoState must be used within TodoProvider');
  }

  return state;
};
