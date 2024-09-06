import { useEffect, useReducer } from 'react';

import { reducer } from '../TodosReducer';
import { Todo } from '../../types/Todo';
// eslint-disable-next-line max-len
import { TodosContextType } from '../types/TodosContextType';

export const useTodosReducer = (): TodosContextType => {
  const [todos, setTodos] = useReducer(reducer, [], (initialState: Todo[]) => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return { todos, setTodos };
};
