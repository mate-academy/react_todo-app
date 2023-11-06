import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';
import { Status } from '../../types/Status';

type Props = {
  children: React.ReactNode
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredType, setFilteredType] = useState(Status.All);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const contextValues = {
    todos,
    setTodos,
    filteredType,
    setFilteredType,
  };

  return (
    <TodosContext.Provider value={contextValues}>
      {children}
    </TodosContext.Provider>
  );
};
