import React from 'react';
import { TodoProvider } from './TodoContext';
import { TodoApp } from './TodoApp';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
