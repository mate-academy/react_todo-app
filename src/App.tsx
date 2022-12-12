import React from 'react';
import { TodoApp } from './components/TodoApp';
import { useLocalStorage } from './components/useLocalStorage/useLocalStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);

  return (
    <TodoApp
      todos={todos}
      setTodos={setTodos}
    />
  );
};
