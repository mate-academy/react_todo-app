import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => (
  <TodoProvider>
    <TodoApp />
  </TodoProvider>
);
