import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoProvider } from './context/TodoContext';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
