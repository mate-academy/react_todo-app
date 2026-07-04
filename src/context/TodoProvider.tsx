import React, { useEffect, useState } from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState<Filter>('All');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        filter,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
