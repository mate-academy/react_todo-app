import React, { createContext, useEffect, useState } from 'react';
import { ITodo } from '../../types/ITodo';

type GlobalContent = {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>,
  filteredTodos: ITodo[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<ITodo[]>>,
};

export const TodosContext = createContext<GlobalContent | null>(null);

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const saved = localStorage.getItem('todos');
    const initialValue = saved && JSON.parse(saved);
    return initialValue || [];
  });
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    setFilteredTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{
      todos,
      setTodos,
      filteredTodos,
      setFilteredTodos,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
