import React, { useState, useEffect } from 'react';

export const TodosContext = React.createContext<ContextType>({
  todos: [],
  setTodos: () => {},
  activeTodos: [],
  setActiveTodos: () => {},
  completedTodos: [],
  setCompletedTodos: () => {},
  visibleTodos: [],
  setVisibleTodos: () => [],
});

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todos') || '[]'),
  );
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));

    setActiveTodos(todos.filter(todo => !todo.completed));
    setCompletedTodos(todos.filter(todo => todo.completed));
  }, [todos]);

  const contextValue: ContextType = {
    todos,
    setTodos,
    activeTodos,
    setActiveTodos,
    completedTodos,
    setCompletedTodos,
    visibleTodos,
    setVisibleTodos,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
