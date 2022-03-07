import React, { createContext, useEffect, useState } from 'react';
import { ITodo } from '../../types/ITodo';

type GlobalContent = {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  filteredTodos: ITodo[];
  setFilteredTodos: (filteredTodos: ITodo[]) => void;
};

export const TodosContext = createContext<GlobalContent | null>(null);

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    setTodos(JSON.parse(localStorage.todos));
  };

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
    saveLocalTodos();
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
