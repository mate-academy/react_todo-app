import React, { useEffect, useReducer } from 'react';

import { Props } from './types/Props';
import { reducer } from './services/todosReducer';
import { TodosContext } from './contexts/TodosContext';
import { Todo } from '../../types/Todo';

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useReducer(reducer, [], (initialState: Todo[]) => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
