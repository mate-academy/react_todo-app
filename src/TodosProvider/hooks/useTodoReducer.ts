import { useEffect, useReducer } from 'react';

import { reducer } from '../todosReducer';
import { Todo } from '../../types/Todo';
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
