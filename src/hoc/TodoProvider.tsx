import React, { useState, useEffect } from 'react';

type Context = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  filteredTodos: Todo[],
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const TodoContext = React.createContext<Context | null>(null);

export const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    const initialValue = saved && JSON.parse(saved);

    return initialValue || [];
  });
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setFilteredTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{
      todos,
      setTodos,
      filteredTodos,
      setFilteredTodos,
    }}
    >
      {children}
    </TodoContext.Provider>
  );
};
